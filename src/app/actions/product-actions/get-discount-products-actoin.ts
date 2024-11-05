"use server";

import { Product } from "../../../../next-type-models";
import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: Product[];
}

export async function getNewestDiscountProducts(): Promise<GetProductsState> {
  try {
    const products = await db.product.findMany({
      where: {
        isInDiscountSection: true,
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
      take: 10,
    });
    return { products, success: true };
  } catch (error) {
    return { error: "خطایی رخ داده است", success: false };
  }
}
