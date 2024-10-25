"use server";

import { redirect } from "next/navigation";
import * as auth from "@/app/auth";
import { revalidatePath } from "next/cache";

interface SignOutFormState {
  state: {
    success?: boolean;
    error?: string;
  };
}
export async function handleSighOut(): Promise<SignOutFormState> {
  try {
    await auth.signOut();
    revalidatePath("/");
    redirect("/");
    // return { state: { success: true } };
    // You can add additional logic here, like redirecting
  } catch (error) {
    return { state: { success: false, error: "خطایی رخ داده است" } };
  }
}
