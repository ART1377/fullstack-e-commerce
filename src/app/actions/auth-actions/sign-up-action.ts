"use server";

import { redirect } from "next/navigation";
import { db } from "../../db/db";
import { hashPassword } from "../../lib/bcrypt";
import { uploadImage } from "../../lib/cloudinary";
import { z } from "zod";

// Zod schema for signup form
const signUpSchema = z
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


interface SighUpFormState {
  errors: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
}

export async function handleSignUp(
  formState: SighUpFormState,
  formData: FormData
): Promise<SighUpFormState> {
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const importedImage = formData.get("image") as File | null;

  // check if form data is valid
  const result = signUpSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  // check validation result
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["کاربری با این ایمیل موجود است"],
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
    }

    // create user in db
    await db.user.create({
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        password: hashedPassword,
        image,
      },
    });
  } catch (error) {
    return {
      errors: {
        _form: ["خطایی رخ داده است"],
      },
    };
  }

  // return user;
  redirect("/auth/login");
}
