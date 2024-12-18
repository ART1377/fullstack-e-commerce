"use server";

import { Product } from "../../../../next-type-models";
import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: Product[];
}

export async function getNewestHeroProducts(): Promise<GetProductsState> {
  try {
    const products = await db.product.findMany({
      where: {
        isInHeroSection: true,
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
        createdAt: "desc",
      },
      take: 3,
    });
    return { products, success: true };
  } catch (error) {
    return { error: "خطایی رخ داده است", success: false };
  }
}
