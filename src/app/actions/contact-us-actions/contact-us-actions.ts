"use server";

import { z } from "zod";
import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth";

const contactSchema = z.object({
  title: z.string().min(1, { message: "عنوان باید وارد شود" }),
  message: z.string().min(1, { message: "پیام باید وارد شود" }),
});

export interface ContactUsFormState {
  success?: boolean;
  errors?: {
    title?: string[];
    message?: string[];
    _form?: string[];
  };
}

export async function createContactUsMessage(
  formState: ContactUsFormState,
  formData: FormData
): Promise<ContactUsFormState> {
  const messageData = {
    title: formData.get("title")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  // check if user is logged in
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["ابتدا وارد سایت شوید"],
      },
      success: false,
    };
  }

  // Validate the product data using Zod
  const result = contactSchema.safeParse(messageData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Data passed validation; now proceed to add the product using Prisma
  const { title, message } = result.data;

  try {
    const notification = await db.notification.create({
      data: {
        userId: session.user.id,
        type: "تماس با ما",
        message: `موضوع : ${title} <br /> پیام : ${message}`,
      },
    });

    revalidatePath("/dashboard/notifications");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errors: { _form: ["ایجاد نظر با مشکل مواجه شد"] },
    };
  }
}
