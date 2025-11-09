// store/slices/categories.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// === Константы и начальное состояние =========================================
const BASE_URL = "http://localhost:3333";

/**
 * Схема состояния (простая и предсказуемая):
 * - items: null   — ещё не грузили (важно отличать от пустого массива [])
 * - loading: bool — идёт запрос
 * - loaded: bool  — хотя бы раз успешно загрузили
 * - error: string|null — текст ошибки для UI
 */
const initialState = {
  items: null,
  loading: false,
  loaded: false,
  error: null,
};

// === Thunk с защитой от дублей запросов ======================================
/**
 * fetchCategories
 * - Тригерим в любом компоненте (хоть в нескольких) — сеть дернётся ОДИН раз,
 *   потому что работает `condition` ниже.
 * - Возвращаем всегда массив ([], даже если сервер кладёт в data).
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_arg, { signal, rejectWithValue }) => {
    console.log("%c→ FETCH /categories/all");
    try {
      const res = await fetch(`${BASE_URL}/categories/all`, { signal });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json();
      // Нормализуем к массиву
      return Array.isArray(data) ? data : (data?.data ?? []);
    } catch (e) {
      return rejectWithValue(e.message || "Failed to load categories");
    }
  },
  {
    /**
     * condition — ключ к "ровно одному запросу".
     * Если уже грузим (loading) или уже загрузили (loaded), в сеть НЕ идём.
     * Это гасит:
     * - двойной mount в React.StrictMode,
     * - несколько компонентов, одновременно диспатчащих один и тот же thunk.
     */
    condition: (_arg, { getState }) => {
      const s = getState().categories;
      if (!s) return true;
      return !(s.loading || s.loaded);
    },
  }
);

// === Slice ===================================================================
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    /**
     * invalidate — опционально: ручная инвалидция кэша.
     * Если когда-нибудь понадобится принудительно перезагрузить:
     *   dispatch(invalidate()); dispatch(fetchCategories());
     */
    invalidate(state) {
      state.items = null;
      state.loaded = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // pending — помечаем "идёт загрузка"
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // fulfilled — кладём массив, считаем "загружено"
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload ?? [];
        state.loading = false;
        state.loaded = true;
        state.error = null;
      })
      // rejected — сохраняем текст ошибки
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error";
      });
  },
});

export const { invalidate } = categoriesSlice.actions;
export default categoriesSlice.reducer;

// === Селекторы (простые «булы» для UI) =======================================
/** null | [] — удобно различать "ещё не запрашивали" и "пустой результат" */
export const selectCategoriesItems = (s) => s.categories.items;

/** всегда массив — удобно для map() без дополнительных проверок */
export const selectCategoriesList = (s) => s.categories.items ?? [];

/** индикатор загрузки */
export const selectCategoriesLoading = (s) => s.categories.loading;

/** строка ошибки (или null) — можно сразу выводить в UI */
export const selectCategoriesError = (s) => s.categories.error;

/** есть ли хоть одна категория */
export const selectCategoriesHasData = (s) =>
  Array.isArray(s.categories.items) && s.categories.items.length > 0;
