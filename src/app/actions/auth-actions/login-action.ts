"use server";

import { redirect } from "next/navigation";
import { db } from "../../db/db";
import { comparePassword } from "../../lib/bcrypt";
import * as auth from "@/app/auth";
import { z } from "zod";



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


interface LoginFormState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
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
