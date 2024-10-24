"use server";

import { number, z } from "zod";
import { db } from "../db/db";
import { revalidatePath } from "next/cache";
import { Feature, Stock } from "../../../next-type-d";
import { auth } from "../auth";
import { uploadImage } from "../lib/cloudinary";
import { Product } from "../../../next-type-models";
import { MAX_PRICE, MIN_PRICE } from "../lib/values";

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

interface ProductFormState {
  errors: {
    title?: string[];
    model?: string[];
    category?: string[];
    brand?: string[];
    price?: string[];
    discount?: string[];
    description?: string[];
    features?: string[];
    stock?: string[];
    images?: string[];
    _form?: string[];
  };
}

// Server action for adding a product
export async function addProduct(
  selectedCategory: string,
  featureItems: Feature[],
  stockItems: Stock[],
  formState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const filterImages: string[] = (formData.getAll("images") as File[])
    .filter((file) => {
      return file.size > 0;
    })
    .map((item) => item.name);
  // Convert form data into an object that can be validated by Zod
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
    images: [...filterImages],
    isInHeroSection: formData.get("hero-section") ? true : false,
    isInDiscountSection: formData.get("discount-section") ? true : false,
  };

  // check if user is logged in
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["ابتدا وارد سایت شوید"],
      },
    };
  }

  // Validate the product data using Zod
  const result = productSchema.safeParse(productData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Data passed validation; now proceed to add the product using Prisma
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
    // Array to hold all uploaded image URLs
    const uploadedImageUrls: string[] = [];

    // Loop through each image and upload it
    for (const image of images) {
      // get image url form cloudinary
      const uploadedImageUrl = await uploadImage(image);
      uploadedImageUrls.push(uploadedImageUrl); // Store the uploaded image URL
    }

    await db.product.create({
      data: {
        title,
        model,
        brand,
        category,
        price,
        discount: discount || 0,
        description,
        isInDiscountSection,
        isInHeroSection,
        features: {
          create: features.map((feature) => ({
            title: feature.title,
            description: feature.description,
          })),
        },
        stock: {
          create: stock.map((s) => ({
            color: {
              connect: { id: s.color }, // Assuming `s.color` holds the color ID
            },
            size: s.size,
            quantity: s.quantity,
          })),
        },
        images: {
          create: uploadedImageUrls.map((url) => ({
            url,
          })),
        },
      },
    });

    //Revalidate product path after adding
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/dashboard/products");

    return {
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ["خطایی رخ داده است"],
      },
    };
  }
}

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
      errors: {
        _form: ["ابتدا وارد سایت شوید"],
      },
    };
  }

  // Validate product data using Zod
  const result = productSchema.safeParse(productData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
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

    const allImages: string[] = [...oldImages, ...uploadedImageUrls];

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
    revalidatePath("/dashboard/products");

    return {
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ["خطایی رخ داده است"],
      },
    };
  }
}

interface GetProductByIdState {
  success: boolean;
  error?: string;
  product?: any; //need change
}
// Define a function to fetch a product by its ID
export async function getProductById(
  productId: string
): Promise<GetProductByIdState> {
  try {
    // Query the product by ID, including related features, stock, and images
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        features: true, // Include the related features
        images: true, // Optionally include images if needed
        comments: true,
        stock: {
          include: {
            color: true, // Include all fields from the ProductColor model
          },
        },
      },
    });

    // If the product is not found, return null or handle accordingly
    if (!product) {
      return {
        success: false,
        error: "اطلاعاتی یافت نشد",
      }; // Or you can throw an error or return a custom message
    }

    // Return the product data
    return {
      success: true,
      product,
    };
  } catch (error) {
    // Handle any errors that occur during the query
    return {
      success: false,
      error: "خطایی رخ داده است",
    };
  }
}

// get list of filtered products
type Filters = {
  page?: string;
  limit?: number;
  searchQuery?: string;
  category?: string;
  colors?: string[]; // Updated to array for multiple colors
  sizes?: string[]; // Updated to array for multiple sizes
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price"; // Can now sort by either price or total stock quantity
  sortOrder?: "asc" | "desc"; // Ascending or descending order
};

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: any;
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}

export async function getFilteredProducts({
  page,
  limit,
  searchQuery = "",
  category = "",
  colors = [], // Defaults to empty array
  sizes = [], // Defaults to empty array
  minPrice = MIN_PRICE,
  maxPrice = MAX_PRICE,
  sortBy, // New: sort by price or quantity
  sortOrder, // Sorting order (asc or desc)
}: Filters): Promise<GetProductsState> {
  const pageQuery = page ? parseInt(page) : undefined;
  const skip = pageQuery && limit ? (pageQuery - 1) * limit : undefined;
  const searchQueryLowerCase = searchQuery ? searchQuery.toLowerCase() : "";

  try {
    // First, count all the products that match the filters
    const totalCount = await db.product.count({
      where: {
        title: {
          contains: searchQueryLowerCase,
        },
        category: category ? category : undefined,
        stock: {
          some: {
            // Support for multiple sizes and colors
            size: sizes.length > 0 ? { in: sizes } : undefined,
            color: colors.length > 0 ? { persian: { in: colors } } : undefined,
          },
        },
        price: {
          gte: minPrice > MIN_PRICE ? minPrice : undefined,
          lte: maxPrice < MAX_PRICE ? maxPrice : undefined,
        },
      },
    });

    // Build dynamic sorting logic based on sortBy and sortOrder
    let orderBy: any = undefined;

    if (sortBy === "price") {
      orderBy = { price: sortOrder };
    } else if (sortBy === "quantity") {
      // Sorting by the total stock quantity (sum of all stock quantities for each product)
      orderBy = {
        _sum: {
          stock: {
            quantity: sortOrder, // Sort by total quantity in ascending or descending order
          },
        },
      };
    }

    // Fetch the actual products (with pagination and sorting)
    const products = await db.product.findMany({
      where: {
        title: {
          contains: searchQueryLowerCase,
        },
        category: category ? category : undefined,
        stock: {
          some: {
            size: sizes.length > 0 ? { in: sizes } : undefined,
            color: colors.length > 0 ? { persian: { in: colors } } : undefined,
          },
        },
        price: {
          gte: minPrice > MIN_PRICE ? minPrice : undefined,
          lte: maxPrice < MAX_PRICE ? maxPrice : undefined,
        },
      },
      skip,
      take: limit || undefined, // Apply pagination if limit exists
      orderBy: orderBy, // Sort by price or sum of stock quantities
      include: {
        images: true, // Include all fields from the ProductImage model
        stock: {
          include: {
            color: true, // Include all fields from the ProductColor model
          },
        },
      },
    });

    // Return the products and pagination info
    return {
      success: true,
      products,
      totalPages: limit ? Math.ceil(totalCount / limit) : 1,
      currentPage: pageQuery || 1,
      totalCount,
    };
  } catch (error) {
    return {
      success: false,
      error: "خطایی در دریافت محصولات رخ داده است.",
    };
  }
}

// delete product by id
interface DeleteProductByIdState {
  error?: string;
}

export async function deleteProductById(
  productId: string
): Promise<DeleteProductByIdState> {
  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: "ابتدا وارد سایت شوید",
    };
  }

  try {
    // Query the product by ID, including related features, stock, and images
    await db.product.delete({
      where: { id: productId },
    });

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/dashboard/products");

    return {
      error: "",
    };
  } catch (error) {
    // Handle any errors that occur during the query
    return {
      error: "خطایی رخ داده است",
    };
  }
}

export async function getAllProducts(): Promise<GetProductsState> {
  try {
    // Fetch the actual products (with pagination and sorting)
    const products = await db.product.findMany({
      include: {
        images: true, // Include all fields from the ProductImage model
        stock: {
          include: {
            color: true, // Include all fields from the ProductColor model
          },
        },
      },
    });

    // Return the products and pagination info
    return {
      success: true,
      products,
    };
  } catch (error) {
    return {
      success: false,
      error: "خطایی در دریافت محصولات رخ داده است.",
    };
  }
}
