"use server";

import { db } from "../../db/db";
import { revalidatePath } from "next/cache";
import { DeleteAccountFormState } from "./delete-user-by-admin-action";
import * as actions from '@/app/actions/auth-actions/auth-actions'
import { auth } from "@/app/auth";

// delete user but user himself
export async function deleteUserByUser(
  userId: string
): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth();

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
    await actions.handleSighOut();
    //Use Prisma to delete the user by email (from the session)
    const user = await db.user.delete({
      where: { id: userId },
    });

    console.log("00000000", user);

    revalidatePath("/profile");
    revalidatePath("/dashboard/users");
    // Optionally, you can return a success response or status
    return { success: true };
  } catch (error) {
    return { success: false, error: "خطایی رخ داده است" };
  }
}
