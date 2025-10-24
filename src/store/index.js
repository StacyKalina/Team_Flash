import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./slices/categories.js"
import filtersReducer from "./slices/filtersSlice";
import productsReducer from "./slices/productsSlice";
import productDetailsReducer from "./slices/productDetailsSlice.js";




export const store = configureStore({
    // не бывает экшина, который бы обрабатывался неск редьюсерами
    reducer: {
        categories: categoriesReducer,
        filters: filtersReducer,
        products: productsReducer,
        productDetails: productDetailsReducer,
    }

})