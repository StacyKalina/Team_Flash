import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Template } from "./Pages/Template";

import { Main } from "./Pages/Main";
import { Catalog } from "./Pages/Catalog/categoryProducts";
import { Cart } from "./Pages/Cart";
import { AllProducts } from "./Pages/Catalog/allProducts";
import { Sales } from "./Pages/Catalog/allSaleProducts";
import CategoriesPage from "./Pages/Categories";
import { NotFound } from "./Pages/NotFound";
import { ProductPage } from "./Pages/Product";




// == подключаем Роуты ==

export const AppRouter = () => {

    return (
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
                    <Route path="product/:productId" element={<ProductPage />} />
                    <Route path="*" element={<NotFound/>}></Route> 
                </Route>
            </Routes>
        </BrowserRouter>

    )
}