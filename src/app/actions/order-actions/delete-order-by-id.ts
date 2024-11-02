"use server";

import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

// delete order by id
interface DeleteOrderByIdState {
  error?: string;
  success?: boolean;
}

export async function deleteOrderById(
  orderId: string
): Promise<DeleteOrderByIdState> {
  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, error: "ابتدا وارد سایت شوید" };
  }

  try {
    // Query the order by ID, including related features, stock, and images
    await db.order.delete({
      where: { id: orderId },
    });


    revalidatePath("/dashboard");
    revalidatePath("/profile");
    revalidatePath("/dashboard/orders");

    return {
      success: true,
    };
  } catch (error) {
    // Handle any errors that occur during the query
    return { success: false, error: "خطایی رخ داده است" };
  }
}
