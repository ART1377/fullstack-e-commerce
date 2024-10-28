"use server";

import { db } from "@/app/db/db";
import { revalidatePath } from "next/cache";

export async function getCartItems(userId: string) {
  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          stock: true,
          product: true,
        },
      },
    },
  });

  if (!cart) {
    throw new Error("سبد خرید یافت نشد");
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    product: item.product,
    stockId: item.stockId,
    stock: item.stock,
  }));

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return { items, total };
}

export async function checkout(userId: string) {

  const { items, total } = await getCartItems(userId);

  return await db.$transaction(async (db) => {
    // Step 1: Check and update stock quantities
    for (const item of items) {
      const stockItem = await db.stock.findUnique({
        where: { id: item.stockId },
        select: { quantity: true },
      });

      if (!stockItem || stockItem.quantity < item.quantity) {
        throw new Error(
          `موجودی کافی برای آیتم: ${item.product.title} وجود ندارد`
        );
      }

      // Reduce stock quantity
      await db.stock.update({
        where: { id: item.stockId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    // Step 2: Create the order with connected products
    const order = await db.order.create({
      data: {
        userId,
        price: total,
        status: "جاری",
        products: {
          connect: items.map((item) => ({ id: item.productId })),
        },
      },
    });

    // Step 3: Clear the user's cart
    await db.cart.update({
      where: { userId },
      data: { items: { deleteMany: {} } },
    });

    revalidatePath("/shopping-cart");

    return order;
  });
}
