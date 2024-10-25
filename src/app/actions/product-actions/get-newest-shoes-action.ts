"use server";

import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: any;
}

export async function getNewestShoes(): Promise<GetProductsState> {
  try {
    const products = await db.product.findMany({
      where: {
        category: "کفش",
      },
      orderBy: {
        createdAt: "desc", // Orders by the latest `createdAt`
      },
      take: 10, // Limits the results to the newest 10 products
    });
    return { products, success: true };
  } catch (error) {
    return { error:'خطایی رخ داده است', success: false };
  }
}
