import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories.js";
import cartReducer, { hydrateCart } from "./slices/cartSlice.js";
import filtersReducer from "./slices/filtersSlice";
import productsReducer from "./slices/productsSlice";
import globalReducer from "./slices/globalSlice.js";
import { loadingMiddleware } from "./middleware/loadingMiddleware.js";
import favoriteReducer from "./slices/favoriteSlice.js";
import favoriteFiltersSlice from "./slices/favoriteFiltersSlice";
import formSlice from "./slices/formSlice.js";

const CART_STORAGE_KEY = "cart_state";

const loadCartItems = () => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.items)) {
      return parsed.items;
    }
  } catch (error) {
    console.warn("Failed to parse cart from storage", error);
  }
  return [];
};

const saveCartItems = (items) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Failed to save cart to storage", error);
  }
};

export const store = configureStore({
  // не бывает экшина, который бы обрабатывался неск редьюсерами
  reducer: {
    categories: categoriesReducer,
    filters: filtersReducer,
    products: productsReducer,
    cart: cartReducer,
    global: globalReducer,
    favorites: favoriteReducer,
    favoriteFilters: favoriteFiltersSlice,
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});

const persistedItems = loadCartItems();
if (persistedItems.length) {
  store.dispatch(hydrateCart({ items: persistedItems }));
}

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const { cart } = store.getState();
    saveCartItems(cart.items);
  });
}
