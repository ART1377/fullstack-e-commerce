"use server";

import { db } from "../../db/db";

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: any;
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}

export async function getAllProducts(): Promise<GetProductsState> {
  try {
    // Fetch the actual products (with pagination and sorting)
    const products = await db.product.findMany({
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
