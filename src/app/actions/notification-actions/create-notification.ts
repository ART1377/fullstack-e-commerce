"use server";

import { db } from "@/app/db/db";
import { revalidatePath } from "next/cache";

interface CreateNotificationState {
  error?: string;
  success?: boolean;
}

export async function createAdminNotification(
  userId: string,
  type: string,
  message: string
) {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        type,
        message,
      },
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


// await createAdminNotification(
//   newUser.id, // or session.user.id if available
//   "ثبت نام",
//   `کاربر ${newUser.firstName} ${newUser.lastName} ثبت نام کرد`
// );

// await createAdminNotification(
//   userId,
//   "سفارش",
//   `کاربر با شناسه ${userId} یک خرید انجام داد`
// );

// await createAdminNotification(
//   session.user.id,
//   "کامنت",
//   `کاربر ${session.user.id} یک نظر ارسال کرد`
// );
