"use server";

import { redirect } from "next/navigation";
import { db } from "../../db/db";
import * as auth from "@/app/auth";
import { revalidatePath } from "next/cache";
import { DeleteAccountFormState } from "./delete-user-by-admin-action";

// delete user but user himself
export async function deleteUserByUser(
  userId: string
): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return { success: false, error: "ابتدا وارد شوید" };
  }

  if (session?.user?.id !== userId) {
    return {
      success: false,
      error: "شما نمیتوانید این کاربر را حذف کنید",
    };
  }

  try {
    //Use Prisma to delete the user by email (from the session)
    await db.user.delete({
      where: { email: session.user.email },
    });

    revalidatePath("/profile");
    revalidatePath("/dashboard/users");
    // Optionally, you can return a success response or status
    return { success: true };
  } catch (error) {
    return { success: false, error: "خطایی رخ داده است" };
  }
}
