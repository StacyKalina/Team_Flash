import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

// Универсально приводим ответ к массиву
const toArray = (json) => {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.data)) return json.data;
  return [];
};

// === THUNKS ===
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch(`${API_BASE_URL}/products/all`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return toArray(json);
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId) => {
    const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return toArray(json);
  }
);

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

// === SLICE ===
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",            // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    source: null,              // "all" | "sales" | `category:${id}`
  },
  reducers: {
    clearProducts(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.source = null;
    },
  },
  extraReducers: (builder) => {
    // ✅ принимаем второй аргумент — функцию, которая вернёт значение source
    const bind = (thunk, sourceGetter) => {
      builder
        .addCase(thunk.pending, (s) => {
          s.status = "loading";
          s.error = null;
        })
        .addCase(thunk.fulfilled, (s, a) => {
          s.status = "succeeded";
          s.items = a.payload;
          s.source = sourceGetter ? sourceGetter(a) : null;
        })
        .addCase(thunk.rejected, (s, a) => {
          s.status = "failed";
          s.error = a.error?.message || "Request failed";
        });
    };

    bind(fetchAllProducts,        () => "all");
    bind(fetchSalesProducts,      () => "sales");
    bind(fetchProductsByCategory, (a) => `category:${a.meta.arg}`);
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;

// Селекторы (если понадобятся)
export const selectAllProducts    = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError  = (state) => state.products.error;
// Можно добавить при желании:
// export const selectProductsSource = (state) => state.products.source;
