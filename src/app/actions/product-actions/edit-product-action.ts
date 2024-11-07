"use server";

import { z } from "zod";
import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { Feature, Stock } from "../../../../next-type-d";
import { auth } from "../../auth";
import { uploadImage } from "@/app/lib/cloudinary";
import { ProductFormState } from "./add-product-action";

const productSchema = z.object({
  title: z.string().min(1, "عنوان محصول الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
  brand: z.string().min(1, "برند الزامی است"),
  model: z.string().min(1, "مدل الزامی است"),
  price: z.number().gt(0, "قیمت باید عددی بیشتر از 0 باشد"),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  rating: z.number().optional(), // Optional rating
  discount: z.number().optional(), // Optional discount
  isInDiscountSection: z.boolean().optional().default(false), // Optional hero section flag
  isInHeroSection: z.boolean().optional().default(false), // Optional discount section flag

  // Features validation: array of objects (id, title, description)
  features: z
    .array(
      z.object({
        title: z.string().min(1, "عنوان ویژگی الزامی است"),
        description: z.string().min(1, "توضیحات ویژگی الزامی است"),
      })
    )
    .nonempty("حداقل یک ویژگی باید ارائه شود"),

  // Images validation: array of File objects
  images: z.string().array().nonempty("حداقل یک عکس باید ارائه شود"),

  // Stock validation: array of stock variations (color, size, quantity)
  stock: z
    .array(
      z.object({
        color: z.string().min(1, "رنگ الزامی است"),
        size: z.string().min(1, "سایز الزامی است"),
        quantity: z.number().min(0, "تعداد باید عددی مثبت باشد"),
      })
    )
    .nonempty("حداقل یک تنوع موجودی باید وجود داشته باشد"),
});

// Server action to update a product
export async function updateProduct(
  oldImages: string[],
  productId: string,
  selectedCategory: string,
  featureItems: Feature[],
  stockItems: Stock[],
  formState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  // Prepare data for validation

  const filterImages: string[] = (formData.getAll("images") as File[])
    .filter((file) => {
      file.size > 0;
    })
    .map((item) => item.name);

  const productData = {
    title: formData.get("title")?.toString() || "",
    model: formData.get("model")?.toString() || "",
    category: selectedCategory || "",
    brand: formData.get("brand")?.toString() || "",
    price: parseFloat(formData.get("price")?.toString() || "0"),
    discount: parseFloat(formData.get("discount")?.toString() || "0"),
    description: formData.get("description")?.toString() || "",
    features: featureItems || [],
    stock: stockItems || [],
    images: [...oldImages, ...filterImages],
    isInHeroSection: formData.get("hero-section") ? true : false,
    isInDiscountSection: formData.get("discount-section") ? true : false,
  };

  // Validate session (user must be logged in)
  const session = await auth();
  if (!session || !session.user) {
    return {
      state: {
        errors: {
          _form: ["ابتدا وارد سایت شوید"],
        },
        success: false,
      },
    };
  }

  // role check
  if (session?.user?.role !== "admin") {
    return {
      state: {
        errors: {
          _form: ["به عنوان ادمین وارد نشدید"],
        },
        success: false,
      },
    };
  }

  // Validate product data using Zod
  const result = productSchema.safeParse(productData);
  if (!result.success) {
    return {
      state: {
        errors: result.error.flatten().fieldErrors,
        success: false,
      },
    };
  }

  // Destructure validated data
  const {
    title,
    category,
    model,
    brand,
    price,
    discount,
    description,
    features,
    stock,
    isInDiscountSection,
    isInHeroSection,
  } = result.data;

  try {
    const images = (formData.getAll("images") as File[]).filter(
      (file) => file.size > 0
    );
    // Array to hold uploaded image URLs if new images are provided
    const uploadedImageUrls: string[] = [];

    if (images && images.length > 0) {
      for (const image of images) {
        const uploadedImageUrl = await uploadImage(image);
        uploadedImageUrls.push(uploadedImageUrl);
      }
    }

    const allImages: string[] = [...uploadedImageUrls,...oldImages];

    // Update the product in the database
    const product = await db.product.update({
      where: { id: productId },
      data: {
        title,
        model,
        category,
        brand,
        price,
        discount: discount || 0,
        description,
        isInDiscountSection,
        isInHeroSection,
        features: {
          // Update features: delete existing and create new ones
          deleteMany: {}, // Clear current features
          create: features.map((feature) => ({
            title: feature.title,
            description: feature.description,
          })),
        },
        stock: {
          // Update stock: delete existing and create new ones
          deleteMany: {}, // Clear current stock
          create: stock.map((s) => ({
            color: {
              connect: { id: s.color }, // Assuming `s.color` holds the color ID
            },
            size: s.size,
            quantity: s.quantity,
          })),
        },
        images: {
          // Update images if any are provided
          deleteMany: {}, // Clear existing images if uploading new ones
          create: allImages.map((url) => ({
            url,
          })),
        },
      },
    });

    // Revalidate cache or page if necessary
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/products");

    return {
      state: {
        success: true,
      },
    };
  } catch (error) {
    return {
      state: {
        errors: {
          _form: ["خطایی رخ داده است"],
        },
        success: false,
      },
    };
  }
}
