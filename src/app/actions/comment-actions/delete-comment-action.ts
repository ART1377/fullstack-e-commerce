"use server";

import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

// delete comment by id
interface DeleteCommentByIdState {
  error?: string;
  success?: boolean;
}

export async function deleteCommentById(
  commentId: string,
  productId: string,
): Promise<DeleteCommentByIdState> {
  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, error: "ابتدا وارد سایت شوید" };
  }

  // role check
  if (session?.user?.role !== "admin") {
    return { success: false, error: "به عنوان ادمین وارد نشدید" };
  }

  try {
    // delete the comment by ID
    await db.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/products/${productId}`);

    return {
      success: true,
    };
  } catch (error) {
    // Handle any errors that occur during the query
    return { success: false, error: "خطایی رخ داده است" };
  }
}
