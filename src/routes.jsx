import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Template } from "./Pages/Template";

import { Main } from "./Pages/Main";
import { Catalog } from "./Pages/Catalog";
import { Cart } from "./Pages/Cart";
import { AllProducts } from "./Pages/AllProducts";
import { Sales } from "./Pages/Sales";
import CategoriesPage from "./Pages/Categories";




// == подключаем Роуты ==

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Template />}>
                    <Route index element={<Main />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="allProducts" element={<AllProducts />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="cart" element={<Cart />} />
                </Route>
            </Routes>
        </BrowserRouter>

    )


}
