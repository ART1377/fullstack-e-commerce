"use server";

import { Product } from "../../../../next-type-models";
import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: Product[];
}

export async function getNewestShoes(): Promise<GetProductsState> {
  try {
    const products = await db.product.findMany({
      where: {
        category: "کفش",
      },
      include: {
        images: true,
        stock: {
          include: {
            color: true,
          },
        },
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
