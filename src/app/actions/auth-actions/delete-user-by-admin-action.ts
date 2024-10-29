"use server";

import { db } from "../../db/db";
import * as auth from "@/app/auth";
import { revalidatePath } from "next/cache";

interface DeleteAccountFormState {
  success?: boolean;
  error?: string;
}

// delete user by admin
export async function deleteUserByAdmin(
  userId: string
): Promise<DeleteAccountFormState> {
  // Get the session to determine if the user is authenticated
  const session = await auth.auth();

  if (!session?.user?.email) {
    return { success: false, error: "ابتدا وارد شوید" };
  }

  // need change for role check
  // if (!session?.user?.role) {
  //   return { success: false, error: "به عنوان ادمین وارد نشدید" };
  // }

  try {
    // Use Prisma to delete the user by email (from the session)
    const user = await db.user.delete({
      where: { id: userId },
    });


    revalidatePath("/dashboard/users");
    revalidatePath("/profile");
    // Optionally, you can return a success response or status
    return { success: true };
  } catch (error) {
    return { success: false, error: "خطایی رخ داده است" };
  }
}
