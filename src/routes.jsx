import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Template } from "./Pages/Template";

import { Main } from "./Pages/Main";
import { Catalog } from "./Pages/Catalog/categoryProducts";
import { Cart } from "./Pages/Cart";
import { AllProducts } from "./Pages/Catalog/allProducts";
import { Sales } from "./Pages/Catalog/allSaleProducts";
import CategoriesPage from "./Pages/Categories";
import { NotFound } from "./Pages/NotFound";
import { ProductDetail } from "./Pages/ProductDetail";
import { Skeleton } from "./Components/Skeleton";
import { useSelector } from "react-redux";
import { selectIsLoading } from "./store/slices/globalSlice";
import Favorites from "./Pages/Favorites";
// == подключаем Роуты ==

export const AppRouter = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      {isLoading && <Skeleton />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Template />}>
            <Route index element={<Main />} />
            <Route path="categories">
              <Route index element={<CategoriesPage />} />
              <Route path=":categoryId" element={<Catalog />} />
            </Route>
            <Route path="allProducts" element={<AllProducts />} />
            <Route path="sales" element={<Sales />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
