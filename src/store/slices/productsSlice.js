

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

// Универсально приводим ответ к массиву
const toArray = (json) => {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.data)) return json.data;
  return [];
};

// === THUNKS ===

// Все продукты
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch(`${API_BASE_URL}/products/all`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return toArray(json);
  }
);

// Продукты по категории
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId) => {
    const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return toArray(json);
  }
);

// Товары со скидкой
export const fetchSalesProducts = createAsyncThunk(
  "products/fetchSales",
  async () => {
    const res = await fetch(`${API_BASE_URL}/products/all`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const all = toArray(await res.json());
    return all.filter(
      (p) =>
        typeof p?.discont_price === "number" &&
        p.discont_price > 0 &&
        p.price &&
        p.discont_price < p.price
    );
  }
);

//  Товар по ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }
);

// === SLICE ===

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    source: null,
  },
  reducers: {
    clearProducts(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.source = null;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Универсальный обработчик для массивов
    const bind = (thunk, sourceGetter) => {
      builder
        .addCase(thunk.pending, (s) => {
          s.status = "loading";
          s.error = null;
        })
        .addCase(thunk.fulfilled, (s, a) => {
          s.status = "succeeded";
          if (thunk === fetchProductById) {
            s.selectedProduct = Array.isArray(a.payload)
              ? a.payload[0]
              : a.payload;
          } else {
            s.items = Array.isArray(a.payload) ? a.payload : [a.payload];
          }
          s.source = sourceGetter ? sourceGetter(a) : null;
        })
        .addCase(thunk.rejected, (s, a) => {
          s.status = "failed";
          s.error = a.error?.message || "Request failed";
        });
    };

    bind(fetchAllProducts, () => "all");
    bind(fetchSalesProducts, () => "sales");
    bind(fetchProductsByCategory, (a) => `category:${a.meta.arg}`);
    bind(fetchProductById, (a) => `id:${a.meta.arg}`);
  },
});

export const { clearProducts, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

// === Селекторы ===
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
