import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store"; // Adjust path as necessary
import { Favorite } from "../../../../next-type-models";



interface FavoritesState {
  items: Partial<Favorite>[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: FavoritesState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunk for fetching favorites
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId: string) => {
    const response = await fetch(`/api/favorites?userId=${userId}`);
    if (!response.ok) {
      throw new Error("خطایی رخ داده است");
    }
    return await response.json();
  }
);

// Async thunk for adding to favorites
export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    if (!response.ok) {
      throw new Error("خطایی رخ داده است");
    }
    return await response.json();
  }
);

// Async thunk for removing from favorites
export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async ({ userId, productId }: { userId: string; productId: string }) => {

    const response = await fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
    if (!response.ok) {
      throw new Error("خطایی رخ داده است");
    }
    return await response.json();
  }
);

// Favorites slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.favorites; // Set favorites from API response
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload.favorite); // Adjust based on your API response
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Ensure the productId is included in the action.payload
        state.items = state.items.filter(
          (item) => item.productId !== action.meta.arg.productId // Use meta.arg to get the original arg
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

// Selector to get favorite items
export const selectFavoriteItems = (state: RootState) => state.favorites.items;

// Export reducer
export default favoritesSlice.reducer;
