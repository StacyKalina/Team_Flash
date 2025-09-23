import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Template } from "./Pages/Template";
import { Main } from "./Pages/Main";
import { Categories } from "./Pages/Categories";
import { Catalog } from "./Pages/Catalog";
import { AllProducts } from "./Pages/AllProducts";
import { AllSales } from "./Pages/Sales";
import { Cart } from "./Pages/Cart";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Template />}>
                    <Route index element={<Main />} />
                    <Route path="allproducts" element={<AllProducts />} />
                     <Route path="allsales" element={<AllSales />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="categories">
                        <Route path="catalog" element={<Catalog />} />
                        <Route index element={<Categories />} />
                    </Route >
                </Route >
            </Routes>
        </BrowserRouter>
    )
};





