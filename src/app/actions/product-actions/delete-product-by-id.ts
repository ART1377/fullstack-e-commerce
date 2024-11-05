"use server";

import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

// delete product by id
interface DeleteProductByIdState {
  error?: string;
  success?: boolean;
}

export async function deleteProductById(
  productId: string
): Promise<DeleteProductByIdState> {
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
    // Query the product by ID, including related features, stock, and images
    await db.product.delete({
      where: { id: productId },
    });

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/products");

    return {
      success: true,
    };
  } catch (error) {
    return { success: false, error: "خطایی رخ داده است" };
  }
}
