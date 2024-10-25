"use server";

import { db } from "../../db/db";

interface GetUserByIdState {
  success: boolean;
  error?: string;
  user?: any;
}

export async function getUserProfileInformation(
  userId: string
): Promise<GetUserByIdState> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        orders: true,
        favorites: true,
      },
    });

    return { success: true, user };
  } catch (error) {
    return { success: true, error: "خطایی رخ داده است" };
  }
}
