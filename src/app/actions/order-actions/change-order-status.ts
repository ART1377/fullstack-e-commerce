// app/actions/order-actions/updateOrderStatus.ts
"use server";

import { auth } from "@/app/auth";
import { db } from "@/app/db/db"; // Adjust the path as necessary
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, error: "ابتدا وارد سایت شوید" };
  }

  try {
    // Update the order status in the database
    await db.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "خطایی رخ داده است" };
  }
}
