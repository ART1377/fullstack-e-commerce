"use server";

import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: any;
}

export async function getNewestHeroProducts(): Promise<GetProductsState> {
  try {
    const products = await db.product.findMany({
      where: {
        isInHeroSection: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return { products, success: true };
  } catch (error) {
    return { error: "خطایی رخ داده است", success: false };
  }
}
