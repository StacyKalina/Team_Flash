import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from "./slices/categories.js"



export const store = configureStore({
    // не бывает экшина, который бы обрабатывался неск редьюсерами
    reducer: {
        categories: categoriesReducer
    }

})