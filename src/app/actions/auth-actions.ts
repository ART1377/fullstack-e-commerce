"use server";

import { redirect } from "next/navigation";
import { db } from "../db/db";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { uploadImage } from "../lib/cloudinary";
import * as auth from "@/app/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

// Zod schema for login form
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "ایمیل الزامی است" })
    .email({ message: "ایمیل نامعتبر است" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
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
interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function updateUser(
  cloudinaryImage: string,
  formState: SighUpFormState,
  formData: FormData
): Promise<SighUpFormState> {
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
      errors: {
        _form: ["ابتدا وارد شوید"],
      },
    };
  }

  // check if form data is valid
  const result = signUpSchema.safeParse({
    firstName,
    lastName,
    email: session?.user?.email,
    password,
    confirmPassword,
  });

  // check validation result
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
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
    
  } catch (error) {
    return {
      errors: {
        _form: ["خطایی رخ داده است"],
      },
    };
  }

  revalidatePath("/profile");
  redirect("/profile");
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

export async function handleLogin(
  formState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // check if form data is valid
  const result = loginSchema.safeParse({
    email,
    password,
  });

  // check validation result
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
  });

  if (user) {
    const isValidPassword = await comparePassword(
      result.data.password,
      user.password
    );
    if (!isValidPassword) {
      return {
        errors: {
          _form: ["رمز عبور با ایمیل مطابقت ندارد"],
        },
      };
    }
  }

  try {
    await auth.signIn("credentials", {
      redirect: false,
      email: result.data.email,
      password: result.data.password,
    });
  } catch (error) {
    return {
      errors: {
        _form: ["خطایی رخ داده است"],
      },
    };
  }

  redirect("/");
}

interface SignOutFormState {
  state: {
    success?: boolean;
    error?: string;
  };
}
export async function handleSighOut(): Promise<SignOutFormState> {
  try {
    await auth.signOut();
    revalidatePath("/");
    return { state: { success: true } };
    // You can add additional logic here, like redirecting
  } catch (error) {
    return { state: { success: false, error: "خطایی رخ داده است" } };
  }

  redirect("/");
}

interface DeleteAccountFormState {
  state: {
    success?: boolean;
    error?: string;
  };
}

// delete user but user himself
export async function deleteUserByUser(
  userId: string
): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return { state: { success: false, error: "ابتدا وارد شوید" } };
  }

  if (session?.user?.id !== userId) {
    return {
      state: { success: false, error: "شما نمیتوانید این کاربر را حذف کنید" },
    };
  }

  try {
    //Use Prisma to delete the user by email (from the session)
    await db.user.delete({
      where: { email: session.user.email },
    });

    revalidatePath("/dashboard/users");
    revalidatePath("/profile");
    // Optionally, you can return a success response or status
  } catch (error) {
    console.log("Error deleting user:", error);
    return { state: { success: false, error: "خطایی رخ داده است" } };
  }
  redirect("/");
}

// delete user by admin
export async function deleteUserByAdmin(): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return { state: { success: false, error: "ابتدا وارد شوید" } };
  }

  // need change for role check
  // if (!session?.user?.role) {
  //   return { success: false, error: "به عنوان ادمین وارد نشدید" };
  // }

  try {
    // Use Prisma to delete the user by email (from the session)
    await db.user.delete({
      where: { email: session.user.email },
    });

    revalidatePath("/dashboard/users");
    revalidatePath("/profile");
    // Optionally, you can return a success response or status
    return { state: { success: true } };
  } catch (error) {
    console.log("Error deleting user:", error);
    return { state: { success: false, error: "خطایی رخ داده است" } };
  }
}
