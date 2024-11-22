"use server";

import { auth } from "@/app/auth";
import { db } from "@/app/db/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createAdminNotification } from "../notification-actions/create-notification";

const createCommentSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان باید وارد شود")
    .max(50, "عنوان نمی‌تواند بیشتر از ۵۰ حرف باشد"),
  description: z
    .string()
    .min(1, "توضیحات باید وارد شود")
    .max(500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ حرف باشد"),
  productId: z.string().uuid("شناسه محصول نامعتبر است"),
  parentId: z.string().uuid("شناسه والد نامعتبر است").optional(),
});

export interface CreateCommentFormState {
  state: {
    success?: boolean;
    errors?: {
      title?: string[];
      description?: string[];
      productId?: string[];
      parentId?: string[];
      _form?: string[];
    };
  };
}

export const createComment = async (
  productId: string,
  parentId: string | undefined,
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const commentData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    productId,
    parentId,
  };

  // check if user is logged in
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      state: {
        errors: {
          _form: ["ابتدا وارد سایت شوید"],
        },
        success: false,
      },
    };
  }

  const result = createCommentSchema.safeParse(commentData);

  if (!result.success) {
    console.log("errors", result.error.flatten().fieldErrors);
    return {
      state: {
        errors: result.error.flatten().fieldErrors,
      },
    };
  }

  const {
    title,
    description,
    productId: productIdData,
    parentId: parentIdData,
  } = result.data;

  try {
    const newComment = await db.comment.create({
      data: {
        title,
        description,
        productId: productIdData,
        userId: session.user.id,
        parentId: parentIdData,
      },
    });

    if (newComment) {
      await createAdminNotification(
        session.user.id,
        "کامنت",
        `کاربر ${session.user?.id} یک نظر ارسال کرد`
      );
    }

    revalidatePath(`/products/${productId}`);
    revalidatePath("/dashboard/notifications");

    return { state: { success: true } };
  } catch (error) {
    return {
      state: {
        success: false,
        errors: { _form: ["ایجاد نظر با مشکل مواجه شد"] },
      },
    };
  }
};
