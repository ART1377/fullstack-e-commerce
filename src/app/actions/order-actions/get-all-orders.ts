"use server";

import { db } from "@/app/db/db";
import { Order } from "../../../../next-type-models";

export type OrderWithName = Order & {
  userName: string;
  totalItems: number;
};

type Filters = {
  page?: string;
  limit?: number;
  sortBy?: "price" | "date"; // Can now sort by either price or total stock quantity
  sortOrder?: "asc" | "desc"; // Ascending or descending order
};

interface GetOrdersState {
  success: boolean;
  error?: string;
  orders?: OrderWithName[];
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}
export async function getAllOrders({
  page,
  limit,
  sortBy, // New: sort by price or quantity
  sortOrder, // Sorting order (asc or desc)
}: Filters): Promise<GetOrdersState> {
  const pageQuery = page ? parseInt(page) : undefined;
  const skip = pageQuery && limit ? (pageQuery - 1) * limit : undefined;

  // Build dynamic sorting logic based on sortBy and sortOrder
  let orderBy: any = undefined;

  if (sortBy === "price") {
    orderBy = { price: sortOrder };
  } else if (sortBy === "date") {
    orderBy = { createdAt: sortOrder };
  }
  try {
    // Fetch the user's orders and aggregate the product information
    const orders = await db.order.findMany({
      select: {
        id: true,
        discountAmount: true,
        totalItems: true,
        price: true,
        createdAt: true,
        status: true,
        user: { select: { firstName: true, lastName: true } },
      },
      skip,
      take: limit || undefined, // Apply pagination if limit exists
      orderBy: orderBy, // Sort by price or sum of stock quantities
    });

    // Process the orders to count statuses and gather product details
    const processedOrders = orders.map((order) => {
      return {
        id: order.id,
        discountAmount: order.discountAmount || 0,
        createdAt: order.createdAt,
        status: order.status,
        price: order.price,
        totalItems: order.totalItems || 0,
        userName: `${order.user.firstName} ${order.user.lastName}`,
      };
    });

    const totalCount = processedOrders.length;

    // Return the orders and pagination info
    return {
      success: true,
      orders: processedOrders,
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
