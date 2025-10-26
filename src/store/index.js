import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categories.js";
import filtersReducer from "./slices/filtersSlice";
import productsReducer from "./slices/productsSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";
import globalReducer from "./slices/globalSlice.js";
import { loadingMiddleware } from "./middleware/loadingMiddleware.js";
import favoriteReducer from "./slices/favoriteSlice.js";
import favoriteFiltersSlice from "./slices/favoriteFiltersSlice";

export const store = configureStore({
  // не бывает экшина, который бы обрабатывался неск редьюсерами
  reducer: {
    categories: categoriesReducer,
    filters: filtersReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    global: globalReducer,
    favorites: favoriteReducer,
    favoriteFilters: favoriteFiltersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});
