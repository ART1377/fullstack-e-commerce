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
    const lowStockProducts = await db.product.findMany({
      where: { stock: { some: { quantity: { lt: 10 } } } },
      include: { stock: true },
    });

    // Recent orders
    const recentOrders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: true },
    });

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
    };
  } catch (error) {
    console.error("Failed to load dashboard data", error);
    throw new Error("Failed to load dashboard data");
  }
}
