import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";

// Define types
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string) => {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    return await response.json(); // This should return an object that includes the cart items
  }
);


// Add product to cart with specific stock item (variation)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    userId,
    productId,
    stockId, // Add stockId
    quantity,
  }: {
    userId: string;
    productId: string;
    stockId: string; // Add stockId
    quantity: number;
  }) => {
    const response = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, stockId, quantity }), // Include stockId
    });
    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }
    return await response.json();
  }
);



// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({
    cartItemId, // Add cartItemId as an argument
    quantity,
  }: {
    cartItemId: string; // Ensure the type is correct
    quantity: number;
  }) => {
    const response = await fetch(`/api/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItemId, quantity }), // Send cartItemId instead of userId and productId
    });
    if (!response.ok) {
      throw new Error("Failed to update cart item");
    }
    return await response.json();
  }
);

// Remove product from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, cartItemId }: { userId: string; cartItemId: string }) => {
    const response = await fetch(`/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItemId }), // Only send cartItemId
    });
    if (!response.ok) {
      throw new Error("Failed to remove from cart");
    }
    return await response.json();
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.cart.items; // Ensure you're accessing items correctly
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.cart.items; // Update with new items including stock
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { cartItemId, quantity } = action.meta.arg; // Destructure to get cartItemId and quantity
        const existingItem = state.items.find((item) => item.id === cartItemId); // Change to match your item's id

        if (existingItem) {
          existingItem.quantity = quantity; // Update quantity directly
        }

        state.status = "succeeded"; // Indicate the operation succeeded
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Filter out the item using cartItemId
        state.items = state.items.filter(
          (item) => item.id !== action.meta.arg.cartItemId // Change productId to cartItemId
        );
        state.status = "succeeded";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
