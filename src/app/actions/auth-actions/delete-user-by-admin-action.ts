"use server";

import { db } from "../../db/db";
import * as auth from "@/app/auth";
import { revalidatePath } from "next/cache";

interface DeleteAccountFormState {
  state: {
    success?: boolean;
    error?: string;
  };
}

// delete user by admin
export async function deleteUserByAdmin(): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return { state: { success: false, error: "ابتدا وارد شوید" } };
  }

  // need change for role check
  // if (!session?.user?.role) {
  //   return { success: false, error: "به عنوان ادمین وارد نشدید" };
  // }

  try {
    // Use Prisma to delete the user by email (from the session)
    await db.user.delete({
      where: { email: session.user.email },
    });

    revalidatePath("/dashboard/users");
    revalidatePath("/profile");
    // Optionally, you can return a success response or status
    return { state: { success: true } };
  } catch (error) {
    console.log("Error deleting user:", error);
    return { state: { success: false, error: "خطایی رخ داده است" } };
  }
}
