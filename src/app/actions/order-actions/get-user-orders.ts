"use server";

import { db } from "@/app/db/db";


export async function getUserOrdersWithDetails(userId: string) {
  // Fetch the user's orders and aggregate the product information
  const orders = await db.order.findMany({
    where: { userId },
    select: {
      id: true,
      discountAmount: true,
      totalItems: true,
      price: true,
      createdAt: true,
      status: true,
      products: {
        select: {
          id: true,
          title: true,
          images: {
            select: {
              url: true, // Get image URL
            },
          },
          stock: {
            select: {
              id: true,
              quantity: true,
            },
          },
        },
      },
    },
  });

  // Count of each status
  const statusCount = {
    ongoing: 0,
    delivered: 0,
    returned: 0,
  };

  // Process the orders to count statuses and gather product details
  const processedOrders = orders.map((order) => {
    // Update status count based on current order status
    if (order.status === "جاری") {
      statusCount.ongoing++;
    } else if (order.status === "تحویل شده") {
      statusCount.delivered++;
    } else if (order.status === "مرجوع شده") {
      statusCount.returned++;
    }

    // Gather product details
    const productDetails = order.products.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.images[0]?.url || "", // Get first image URL, or empty if none
    }));

    return {
      id: order.id,
      discountAmount: order.discountAmount || 0,
      createdAt: order.createdAt,
      products: productDetails,
      status: order.status,
      price: order.price,
      totalItems: order.totalItems,
    };
  });

  console.log(processedOrders);

  return {
    statusCount,
    orders: processedOrders,
  };
}
