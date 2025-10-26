// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Template } from "./Pages/Template";

// import { Main } from "./Pages/Main";
// import { Catalog } from "./Pages/Catalog/categoryProducts";
// import { Cart } from "./Pages/Cart";
// import { AllProducts } from "./Pages/Catalog/allProducts";
// import { Sales } from "./Pages/Catalog/allSaleProducts";
// import CategoriesPage from "./Pages/Categories";
// import { NotFound } from "./Pages/NotFound";
// import { ProductDetail } from "./Pages/ProductDetail";


// // == подключаем Роуты ==

// export const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Template />}>
//           <Route index element={<Main />} />
//           <Route path="categories">
//             <Route index element={<CategoriesPage />} />
//             <Route path=":categoryId" element={<Catalog />} />
//           </Route>
//           <Route path="allProducts" element={<AllProducts />} />
//           <Route path="sales" element={<Sales />} />
//           <Route path="cart" element={<Cart />} />
//           <Route path="*" element={<NotFound />}></Route>
//           <Route path="/product/:id" element={<ProductDetail />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };


import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Template } from "./Pages/Template";

import { Main } from "./Pages/Main";
import { CategoriesPage } from "./Pages/Categories";
import { Catalog } from "./Pages/Catalog/categoryProducts";
import { AllProducts } from "./Pages/Catalog/allProducts";
import { Sales } from "./Pages/Catalog/allSaleProducts";
import { Cart } from "./Pages/Cart";
import { ProductDetail } from "./Pages/ProductDetail";
import { NotFound } from "./Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: <NotFound />,
    handle: { breadcrumb: () => ({ label: "Main page", to: "/" }) },

    children: [
      { index: true, element: <Main /> },

      // ВАЖНО: делаем categories родителем и вкладываем :categoryId внутрь!
      {
        path: "categories",
        handle: { breadcrumb: () => ({ label: "Categories", to: "/categories" }) },
        children: [
          { index: true, element: <CategoriesPage /> },
          {
            path: ":categoryId",
            element: <Catalog />,
            handle: {
              breadcrumb: ({ params, categories }) => {
                const id = Number(params.categoryId);
                const cat = categories?.find?.((c) => Number(c.id) === id);
                return { label: cat?.title ?? cat?.name ?? `Category ${id}`, to: `/categories/${id}` };
              },
            },
          },
        ],
      },

      { path: "allProducts", element: <AllProducts />, handle: { breadcrumb: () => ({ label: "All products", to: "/allProducts" }) } },
      { path: "sales",       element: <Sales />,       handle: { breadcrumb: () => ({ label: "Sales",        to: "/sales" }) } },
      { path: "cart",        element: <Cart />,        handle: { breadcrumb: () => ({ label: "Cart",         to: "/cart" }) } },

      {
        path: "product/:id",
        element: <ProductDetail />,
        handle: {
          breadcrumb: ({ params, products, selectedProduct, categories, cameFrom }) => {
            const pid = Number(params.id);
            const fromList = products?.find?.((p) => p.id === pid);
            const title = fromList?.title ?? selectedProduct?.title ?? `Product ${pid}`;

            const prefix = [];
            if (cameFrom?.type === "category") {
              const cid = Number(cameFrom.id);
              const cat = categories?.find?.((c) => Number(c.id) === cid);
              // благодаря вложенным рутам эти два звена отображаются корректно
              prefix.push({ label: "Categories", to: "/categories" });
              prefix.push({ label: cat?.title ?? cat?.name ?? `Category ${cid}`, to: `/categories/${cid}` });
            } else if (cameFrom?.type === "sales") {
              prefix.push({ label: "Sales", to: "/sales" });
            } else if (cameFrom?.type === "all") {
              prefix.push({ label: "All products", to: "/allProducts" });
            }

            return [...prefix, { label: title, to: `/product/${pid}` }];
          },
        },
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;


