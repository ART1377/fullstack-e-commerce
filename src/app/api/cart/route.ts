import { db } from "@/app/db/db";
import { NextResponse } from "next/server";

// GET: Fetch all cart items for the user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {


    const cart = await db.cart.findUnique({
      where: { userId: userId! },
      include: {
        items: {
          include: {
            product: {
              select:{
                title:true,
                images:true,
                price:true,
                discount:true,
              }
            },
            stock: {
              select: {
                quantity: true,
                size: true,
                color: true,
              },
            },
          },
        },
      },
    });
    if (!cart) {
      throw new Error("خطایی رخ داده است");
    }

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}

// POST: Add a product to the cart (with a specific stock item)
export async function POST(req: Request) {
  const { userId, stockId, productId, quantity } = await req.json();

  try {
    // Check if cart exists for user
    let cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await db.cart.create({
        data: {
          userId,
          items: {
            create: {
              productId,
              stockId, // Include stockId when adding to the cart
              quantity,
            },
          },
        },
        include: { items: true },
      });
    } else {
      // Check if the specific stock item is already in the cart
      const cartItem = await db.cartItem.findUnique({
        where: {
          stockId_cartId: { stockId, cartId: cart.id },
        },
      });

      if (cartItem) {
        // Update quantity if the stock item is already in the cart
        await db.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity + quantity },
        });
      } else {
        // Add new stock item (variation) to cart
        await db.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            stockId, // Include stockId for the variation
            quantity,
          },
        });
      }

      // Fetch the updated cart
      cart = await db.cart.findUnique({
        where: { userId },
        include: { items: true },
      });
    }

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}

// PATCH: Update product quantity in cart (increment/decrement)
export async function PATCH(req: Request) {
  const { cartItemId, quantity } = await req.json();

  try {
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, message: "خطایی رخ داده است" },
        { status: 404 }
      );
    }

    // If quantity is 0 or less, remove the item
    if (quantity <= 0) {
      await db.cartItem.delete({
        where: { id: cartItemId },
      });
    } else {
      await db.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}

// DELETE: Remove product from cart
// DELETE: Remove all products from the cart for a user
export async function DELETE(req: Request) {
  const { userId, deleteAll = false, cartItemId } = await req.json();


  if (!userId) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 400 }
    );
  }

  try {
    if (deleteAll) {
      // Delete all cart items for the user
      await db.cartItem.deleteMany({
        where: { cart: { userId } },
      });
      return NextResponse.json({ success: true, message: "سبد خرید پاک شد" });
    } else {
      // This handles single item deletion (the original behavior)
      if (!cartItemId) {
        return NextResponse.json(
          { success: false, message: "خطایی رخ داده است" },
          { status: 400 }
        );
      }

      await db.cartItem.delete({
        where: { id: cartItemId },
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}
