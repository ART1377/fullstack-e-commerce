"use server";

import { db } from "@/app/db/db";

export async function loadDashboardData() {
  try {
    // Key metrics
    const totalSales = await db.order.aggregate({
      _sum: { price: true },
    });

    const totalOrders = await db.order.count();
    const totalUsers = await db.user.count();
    const productsInStock = await db.stock.aggregate({
      _sum: { quantity: true },
    });

    // Sales trend data for the past 7 days
    const salesData = await db.order.groupBy({
      by: ["createdAt"],
      _sum: { price: true },
      orderBy: { createdAt: "desc" },
      take: 7,
    });

    // Low stock products
    // Step 1: Aggregate stock quantities by product and filter for totals less than 10
    const lowStockProductIds = await db.stock.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
      },
      having: {
        quantity: {
          _sum: { lt: 10 },
        },
      },
    });

    // Extract product IDs from the aggregation result
    const productIds = lowStockProductIds.map((item) => item.productId);

    // Step 2: Fetch the product details using the filtered product IDs
    const lowStockProducts = await db.product.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        stock: true,
        images: true,
      },
    });

    // Recent orders
    const recentOrders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: true },
    });

    // Order status counts
    const statusCounts = await db.order.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    // Calculate percentages for each status
    const statusPercentages = statusCounts.map((status) => ({
      status: status.status,
      count: status._count.status,
      percentage: Number(
        ((status._count.status / totalOrders) * 100).toFixed(2)
      ),
    }));

    return {
      totalSales: totalSales._sum.price || 0,
      totalOrders,
      totalUsers,
      productsInStock: productsInStock._sum.quantity || 0,
      salesData: salesData.map((sale) => ({
        date: sale.createdAt.toISOString().split("T")[0],
        sales: sale._sum.price || 0,
      })),
      recentOrders,
      lowStockProducts,
      statusPercentages,
    };
  } catch (error) {
    throw new Error("خطایی رخ داده است");
  }
}
