"use server";

import { redirect } from "next/navigation";
import { db } from "../../db/db";
import { hashPassword } from "../../lib/bcrypt";
import { uploadImage } from "../../lib/cloudinary";
import * as auth from "@/app/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Zod schema for signup form
const editUserSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "نام الزامی است" })
      .max(50, { message: "نام نمی‌تواند بیشتر از ۵۰ حرف باشد" }),
    lastName: z
      .string()
      .min(1, { message: "نام خانوادگی الزامی است" })
      .max(50, { message: "نام خانوادگی نمی‌تواند بیشتر از ۵۰ حرف باشد" }),
    email: z
      .string()
      .min(1, { message: "ایمیل الزامی است" })
      .email({ message: "ایمیل نامعتبر است" }),
    password: z
      .string()
      .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
    confirmPassword: z
      .string()
      .min(6, { message: "تکرار رمز عبور باید حداقل ۶ کاراکتر باشد" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

export interface EditUserFormState {
  state: {
    success?: boolean;
    errors?: {
      firstName?: string[];
      lastName?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
      _form?: string[];
    };
  };
}

export async function updateUser(
  cloudinaryImage: string,
  formState: EditUserFormState,
  formData: FormData
): Promise<EditUserFormState> {
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const importedImage = formData.get("image") as File | null;

  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return {
      state: {
        errors: {
          _form: ["ابتدا وارد سایت شوید"],
        },
        success: false,
      },
    };
  }

  // check if form data is valid
  const result = editUserSchema.safeParse({
    firstName,
    lastName,
    email: session?.user?.email,
    password,
    confirmPassword,
  });

  // check validation result
  if (!result.success) {
    return {
      state: {
        errors: result.error.flatten().fieldErrors,
        success: false,
      },
    };
  }

  try {
    // hash password
    const hashedPassword = await hashPassword(result.data.password);

    // upload image on cloudinary
    let image;
    if (importedImage?.size) {
      image = await uploadImage(importedImage);
    } else if (cloudinaryImage) {
      image = cloudinaryImage;
    }

    await db.user.update({
      where: { id: session?.user?.id }, // Update the user by ID
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        image: image,
        password: hashedPassword,
      },
    });

    revalidatePath("/profile");
    revalidatePath("/dashboard/users");

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
