"use server";

import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

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
