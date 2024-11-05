"use server";

import { auth } from "@/app/auth";
import { db } from "@/app/db/db";
import { revalidatePath } from "next/cache";

interface ToggleNotificationState {
  error?: string;
  success?: boolean;
}

export async function toggleNotificationReadStatus(
  notificationId: string
): Promise<ToggleNotificationState> {
  const session = await auth();
  // role check
  if (session?.user?.role !== "admin") {
    return { success: false, error: "به عنوان ادمین وارد نشدید" };
  }
  try {
    const notification = await db.notification.findUnique({
      where: { id: notificationId },
    });

    const updatedNotification = await db.notification.update({
      where: { id: notificationId },
      data: { isRead: !notification?.isRead },
    });

    revalidatePath("/dashboard/notifications");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "خطایی رخ داده است.",
    };
  }
}
