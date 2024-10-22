import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Assuming you have a cart slice
import favoritesReducer from "./slices/favoritesSlice"; // Add this line

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer, // Include favorites slice
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


//i want to have add to favorite and remove form that using route handlers integrated with reduxt toolkit also add to cart and remove from cart and update quantity (add quantity and remove from quantity)   also you see i have defferent variation of prodcut (stock) so i want when i click on add to cart on prodcutCard first add from first stock item and when first stock item quantity got zero go to next stock item note that when i add prodcut to cart and update quantity from producct detail page i can select with color and size should be added
