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
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching cart" },
      { status: 500 }
    );
  }
}

// POST: Add a product to the cart
// POST: Add a product to the cart
// POST: Add a product to the cart
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  try {
    // Check if cart exists for user
    let cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: true, // Ensure to include the items
      },
    });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await db.cart.create({
        data: {
          userId,
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
        include: {
          items: true, // Include items in the response
        },
      });
    } else {
      // Check if product already in cart
      const cartItem = await db.cartItem.findUnique({
        where: {
          productId_cartId: { productId, cartId: cart.id },
        },
      });

      if (cartItem) {
        // Update quantity if product is already in cart
        await db.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity + quantity },
        });
      } else {
        // Add new product to cart
        await db.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }

      // Fetch the updated cart
      cart = await db.cart.findUnique({
        where: { userId },
        include: {
          items: true, // Ensure items are included
        },
      });
    }

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { success: false, message: "Error adding to cart" },
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
        { success: false, message: "Cart item not found" },
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
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { success: false, message: "Error updating cart" },
      { status: 500 }
    );
  }
}


// DELETE: Remove product from cart
export async function DELETE(req: Request) {
  const { cartItemId } = await req.json();

  if (!cartItemId) {
    return NextResponse.json(
      { success: false, message: "Cart item ID is required" },
      { status: 400 }
    );
  }

  try {
    await db.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { success: false, message: "Error removing from cart" },
      { status: 500 }
    );
  }
}

