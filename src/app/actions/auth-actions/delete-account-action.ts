"use server";

import { redirect } from "next/navigation";
import { db } from "../../db/db";
import * as auth from "@/app/auth";
import { revalidatePath } from "next/cache";

interface DeleteAccountFormState {
  state: {
    success?: boolean;
    error?: string;
  };
}

// delete user but user himself
export async function deleteUserByUser(
  userId: string
): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return { state: { success: false, error: "ابتدا وارد شوید" } };
  }

  if (session?.user?.id !== userId) {
    return {
      state: { success: false, error: "شما نمیتوانید این کاربر را حذف کنید" },
    };
  }

  try {
    //Use Prisma to delete the user by email (from the session)
    await db.user.delete({
      where: { email: session.user.email },
    });

    revalidatePath("/dashboard/users");
    revalidatePath("/profile");
    // Optionally, you can return a success response or status
  } catch (error) {
    console.log("Error deleting user:", error);
    return { state: { success: false, error: "خطایی رخ داده است" } };
  }
  redirect("/");
}
