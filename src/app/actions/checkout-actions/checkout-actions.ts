"use server";

import { auth } from "@/app/auth";
import { db } from "@/app/db/db";
import { calculateDiscountAmount } from "@/app/lib/functions";
import { revalidatePath } from "next/cache";
import { createAdminNotification } from "../notification-actions/create-notification";

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

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalDiscount = items.reduce(
    (sum, item) =>
      sum +
      calculateDiscountAmount(item.product.price, item.product.discount || 0) *
        item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  console.log("totalItems", totalItems);

  return { items, totalPrice, totalDiscount, totalItems };
}

export async function checkout(userId: string) {
  const { items, totalPrice, totalDiscount, totalItems } = await getCartItems(
    userId
  );

  // check if user is logged in
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, error: "ابتدا وارد سایت شوید" };
  }

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
        price: totalPrice,
        discountAmount: totalDiscount,
        totalItems,
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

    if (order) {
      await createAdminNotification(
        userId,
        "سفارش",
        `کاربر با شناسه ${session.user?.name} یک خرید انجام داد`
      );
    }

    revalidatePath("/shopping-cart");
    revalidatePath("/dashboard/notifications");
    revalidatePath("/dashboard/users");

    return order;
  });
}
