"use server";

import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

// delete notification by id
interface DeleteNotificationByIdState {
  error?: string;
  success?: boolean;
}

export async function deleteNotificationById(
  notificationId: string
): Promise<DeleteNotificationByIdState> {
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
    // Query the notification by ID, including related features, stock, and images
    await db.notification.delete({
      where: { id: notificationId },
    });

    revalidatePath("/dashboard/notifications");

    return {
      success: true,
    };
  } catch (error) {
    // Handle any errors that occur during the query
    return { success: false, error: "خطایی رخ داده است" };
  }
}
