// store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

/** Приводим ответ бэка к массиву */
const toArray = (json) => {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.data)) return json.data;
  return [];
};

/**
 * Состояние:
 * - items: null | []        (null = ещё не грузили; [] = загружено, но пусто)
 * - selectedProduct: object | null
 * - loading / loaded: bool
 * - error: string | null
 * - source: 'none' | 'all' | 'sales' | 'category' | 'id'
 * - currentCategoryId: number | null — чтобы не перезапрашивать ту же категорию
 */
const initialState = {
  items: null,
  selectedProduct: null,
  loading: false,
  loaded: false,
  error: null,
  source: "none",
  currentCategoryId: null,
};

// ============================ THUNKS =====================================

/**
 * Все продукты
 * condition: если уже загружены 'all' и сейчас не грузим — в сеть не идём
 */
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_arg, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/all`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return toArray(json);
    } catch (e) {
      return rejectWithValue(e.message || "Failed to load products");
    }
  },
  {
    condition: (_arg, { getState }) => {
      const s = getState().products;
      if (!s) return true;
      if (s.loading) return false;
      return !(s.loaded && s.source === "all");
    },
  }
);

/**
 * Продукты по категории
 * condition: не перезапрашиваем, если та же категория уже загружена
 */
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return toArray(json);
    } catch (e) {
      return rejectWithValue(e.message || "Failed to load category products");
    }
  },
  {
    condition: (categoryId, { getState }) => {
      const s = getState().products;
      if (!s) return true;
      if (s.loading) return false;
      return !(
        s.loaded &&
        s.source === "category" &&
        String(s.currentCategoryId) === String(categoryId)
      );
    },
  }
);

/**
 * Товары со скидкой (фильтруем на клиенте)
 * condition: если уже загружены 'sales' — не идём в сеть снова
 */
export const fetchSalesProducts = createAsyncThunk(
  "products/fetchSales",
  async (_arg, { signal, rejectWithValue }) => {
    // Лог для контроля реальных запросов:
    console.log(
      "%c→ FETCH /products/all (for sales)",
      "color:#00b894; font-weight:bold"
    );

    try {
      const res = await fetch(`${API_BASE_URL}/products/all`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const all = toArray(await res.json());
      return all.filter(
        (p) =>
          typeof p?.discont_price === "number" &&
          p.discont_price > 0 &&
          p.price &&
          p.discont_price < p.price
      );
    } catch (e) {
      return rejectWithValue(e.message || "Failed to load sales");
    }
  },
  {
    condition: (_arg, { getState }) => {
      const s = getState().products;
      if (!s) return true;
      if (s.loading) return false;
      return !(s.loaded && s.source === "sales");
    },
  }
);

/**
 * Товар по ID (обычно всегда хотим свежий; без condition)
 */
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message || "Failed to load product");
    }
  }
);

// ============================= SLICE =====================================

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /** Чистим список (например, при смене категории перед новым запросом) */
    clearProducts(state) {
      state.items = null;
      state.loaded = false;
      state.error = null;
      // при желании можно сбросить источник:
      // state.source = "none";
      // state.currentCategoryId = null;
    },
    /** Чистим выбранный товар (при уходе со страницы деталей) */
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    // === All ===
    builder
      .addCase(fetchAllProducts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (s, a) => {
        s.items = Array.isArray(a.payload) ? a.payload : [a.payload];
        s.loading = false;
        s.loaded = true;
        s.error = null;
        s.source = "all";
        s.currentCategoryId = null;
      })
      .addCase(fetchAllProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message || "Request failed";
      });

    // === By Category ===
    builder
      .addCase(fetchProductsByCategory.pending, (s, a) => {
        s.loading = true;
        s.error = null;
        s.source = "category";
        s.currentCategoryId = a.meta.arg ?? null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (s, a) => {
        s.items = Array.isArray(a.payload) ? a.payload : [a.payload];
        s.loading = false;
        s.loaded = true;
        s.error = null;
        s.source = "category";
        s.currentCategoryId = a.meta.arg ?? null;
      })
      .addCase(fetchProductsByCategory.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message || "Request failed";
      });

    // === Sales ===
    builder
      .addCase(fetchSalesProducts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchSalesProducts.fulfilled, (s, a) => {
        s.items = Array.isArray(a.payload) ? a.payload : [a.payload];
        s.loading = false;
        s.loaded = true;
        s.error = null;
        s.source = "sales";
        s.currentCategoryId = null;
      })
      .addCase(fetchSalesProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message || "Request failed";
      });

    // === By Id ===
    builder
      .addCase(fetchProductById.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.selectedProduct = Array.isArray(a.payload) ? a.payload[0] : a.payload;
        s.loading = false;
        s.error = null;
        s.source = "id";
      })
      .addCase(fetchProductById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message || "Request failed";
      });
  },
});

export const { clearProducts, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

// ============================ СЕЛЕКТОРЫ ==================================

/** null | [] — удобно различать «ещё не грузили» и «загружено, но пусто» */
export const selectProductsItems   = (s) => s.products.items;
/** всегда массив — удобно делать .map() без проверок */
export const selectAllProducts     = (s) => s.products.items ?? [];
/** индикатор загрузки */
export const selectProductsLoading = (s) => s.products.loading;
/** текст ошибки (или null) */
export const selectProductsError   = (s) => s.products.error;
/** есть ли данные для списка */
export const selectProductsHasData = (s) =>
  Array.isArray(s.products.items) && s.products.items.length > 0;
/** текущий «источник данных» (all/sales/category/id/none) */
export const selectProductsSource  = (s) => s.products.source;
/** текущая категория (если source === 'category') */
export const selectProductsCurrentCategoryId = (s) => s.products.currentCategoryId;
/** выбранный товар (страница деталей) */
export const selectSelectedProduct = (s) => s.products.selectedProduct;
