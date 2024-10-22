import { db } from "../db/db";




export async function addToCart(userId: string, productId: string) {
  try {
    // Fetch the cart for the user
    let cart = await db.cart.findUnique({
      where: { userId: userId }, // Find the cart by the user ID
    });

    // If no cart exists, create a new one for the user
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: userId,
        },
      });
    }

    // Now, add the item to the cart using cart.id
    await db.cartItem.create({
      data: {
        productId,
        quantity: 1, // Specify the quantity
        cartId: cart.id, // Directly set the cartId
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false };
  }
}



export async function removeFromCart(userId: string, productId: string) {
  try {
    await db.cartItem.deleteMany({
      where: { cart: { userId }, productId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false };
  }
}
