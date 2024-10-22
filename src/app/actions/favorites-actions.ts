import { db } from "../db/db";
import { Product } from "../../../next-type-models";


export async function addToFavorites(userId: string, productId: string) {
  try {
    await db.favorite.create({
      data: {
        userId,
        productId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return { success: false };
  }
}

export async function removeFromFavorites(userId: string, productId: string) {
  try {
    await db.favorite.deleteMany({
      where: { userId, productId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return { success: false };
  }
}
