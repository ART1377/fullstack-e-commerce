"use server";

import { Product } from "../../../../next-type-models";
import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: Product[];
}

export async function getRelatedProducts(
  productId: string
): Promise<GetProductsState> {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        category: true,
      },
    });

    // Fetch the actual products (with pagination and sorting)
    const products = await db.product.findMany({
      where: {
        category: product?.category,
        id: {
          not: productId,
        },
      },
      include: {
        images: true, // Include all fields from the ProductImage model
        stock: {
          include: {
            color: true, // Include all fields from the ProductColor model
          },
        },
      },
    });

    // Return the products and pagination info
    return {
      success: true,
      products,
    };
  } catch (error) {
    return {
      success: false,
      error: "خطایی در دریافت محصولات رخ داده است.",
    };
  }
}
