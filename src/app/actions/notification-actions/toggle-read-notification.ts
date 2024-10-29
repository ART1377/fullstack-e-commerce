"use server";

import { db } from "@/app/db/db";
import { revalidatePath } from "next/cache";

interface ToggleNotificationState {
  error?: string;
  success?: boolean;
}

export async function toggleNotificationReadStatus(
  notificationId: string
): Promise<ToggleNotificationState> {
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
