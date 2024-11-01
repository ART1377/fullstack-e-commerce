"use server";

import { db } from "../../db/db";
import { MAX_PRICE, MIN_PRICE } from "../../lib/values";

// get list of filtered products
type Filters = {
  page?: string;
  limit?: number;
  searchQuery?: string;
  category?: string;
  colors?: string[]; // Updated to array for multiple colors
  sizes?: string[]; // Updated to array for multiple sizes
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "date"; // Can now sort by either price or total stock quantity
  sortOrder?: "asc" | "desc"; // Ascending or descending order
};

interface GetProductsState {
  success: boolean;
  error?: string;
  products?: any;
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}

export async function getFilteredProducts({
  page,
  limit,
  searchQuery = "",
  category = "",
  colors = [], // Defaults to empty array
  sizes = [], // Defaults to empty array
  minPrice = MIN_PRICE,
  maxPrice = MAX_PRICE,
  sortBy, // New: sort by price or quantity
  sortOrder, // Sorting order (asc or desc)
}: Filters): Promise<GetProductsState> {
  const pageQuery = page ? parseInt(page) : undefined;
  const skip = pageQuery && limit ? (pageQuery - 1) * limit : undefined;
  const searchQueryLowerCase = searchQuery ? searchQuery.toLowerCase() : "";

  try {
    // First, count all the products that match the filters
    const totalCount = await db.product.count({
      where: {
        title: {
          contains: searchQueryLowerCase,
        },
        category: category ? category : undefined,
        stock: {
          some: {
            // Support for multiple sizes and colors
            size: sizes.length > 0 ? { in: sizes } : undefined,
            color: colors.length > 0 ? { persian: { in: colors } } : undefined,
          },
        },
        price: {
          gte: minPrice > MIN_PRICE ? minPrice : undefined,
          lte: maxPrice < MAX_PRICE ? maxPrice : undefined,
        },
      },
    });

    // Build dynamic sorting logic based on sortBy and sortOrder
    let orderBy: any = undefined;

     if (sortBy === "price") {
       orderBy = { price: sortOrder };
     } else if (sortBy === "date") {
       orderBy = { createdAt: sortOrder };
     }

    // Fetch the actual products (with pagination and sorting)
    const products = await db.product.findMany({
      where: {
        title: {
          contains: searchQueryLowerCase,
        },
        category: category ? category : undefined,
        stock: {
          some: {
            size: sizes.length > 0 ? { in: sizes } : undefined,
            color: colors.length > 0 ? { persian: { in: colors } } : undefined,
          },
        },
        price: {
          gte: minPrice > MIN_PRICE ? minPrice : undefined,
          lte: maxPrice < MAX_PRICE ? maxPrice : undefined,
        },
      },
      skip,
      take: limit || undefined, // Apply pagination if limit exists
      orderBy: orderBy, // Sort by price or sum of stock quantities
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
      totalPages: limit ? Math.ceil(totalCount / limit) : 1,
      currentPage: pageQuery || 1,
      totalCount,
    };
  } catch (error) {
    return {
      success: false,
      error: "خطایی در دریافت محصولات رخ داده است.",
    };
  }
}
