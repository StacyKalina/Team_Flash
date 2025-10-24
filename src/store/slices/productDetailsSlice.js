import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

export const fetchProductById = createAsyncThunk(
  "productDetails/fetchById",
  async (productId) => {
    const res = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? json[0] ?? null : json; // очікуємо один об’єкт товару
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    item: null,
    status: "idle",       // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    clearProductDetails(state) {
      state.item = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.item = a.payload;
      })
      .addCase(fetchProductById.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message || "Request failed";
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;

// селектори
export const selectProductDetails    = (state) => state.productDetails.item;
export const selectProductDetailsStatus = (state) => state.productDetails.status;
export const selectProductDetailsError  = (state) => state.productDetails.error;
