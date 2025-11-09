import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { Template } from "./Pages/Template";
import { Main } from "./Pages/Main";
import { CategoriesPage } from "./Pages/Categories";
import { Catalog } from "./Pages/Catalog/categoryProducts";
import { AllProducts } from "./Pages/Catalog/allProducts";
import { Sales } from "./Pages/Catalog/allSaleProducts";
import { Cart } from "./Pages/Cart";
import { ProductDetail } from "./Pages/ProductDetail";
import { NotFound } from "./Pages/NotFound";
import Favorites from "./Pages/Favorites";

import { selectIsLoading } from "./store/slices/globalSlice";

// ----------------- router definition with breadcrumbs -----------------
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    errorElement: <NotFound />,
    handle: { breadcrumb: () => ({ label: "Main page", to: "/" }) },

    children: [
      { index: true, element: <Main /> },

      // ВАЖНО: вложенный маршрут categories → :categoryId,
      // чтобы крошка "Categories" всегда присутствовала
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
                return {
                  label: cat?.title ?? cat?.name ?? `Category ${id}`,
                  to: `/categories/${id}`,
                };
              },
            },
          },
        ],
      },

      {
        path: "allProducts",
        element: <AllProducts />,
        handle: { breadcrumb: () => ({ label: "All products", to: "/allProducts" }) },
      },

      {
        path: "sales",
        element: <Sales />,
        handle: { breadcrumb: () => ({ label: "Sales", to: "/sales" }) },
      },

      {
        path: "cart",
        element: <Cart />,
        handle: { breadcrumb: () => ({ label: "Cart", to: "/cart" }) },
      },

      {
        path: "favorites",
        element: <Favorites />,
        handle: { breadcrumb: () => ({ label: "Favorites", to: "/favorites" }) },
      },

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
              prefix.push({ label: "Categories", to: "/categories" });
              prefix.push({
                label: cat?.title ?? cat?.name ?? `Category ${cid}`,
                to: `/categories/${cid}`,
              });
            } else if (cameFrom?.type === "sales") {
              prefix.push({ label: "Sales", to: "/sales" });
            } else if (cameFrom?.type === "all") {
              prefix.push({ label: "All products", to: "/allProducts" });
            } else if (cameFrom?.type === "favorites") {
              prefix.push({ label: "Favorites", to: "/favorites" });
            }

            return [...prefix, { label: title, to: `/product/${pid}` }];
          },
        },
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);



// ---------- глобальный оверлей загрузки ----------
const GlobalLoadingOverlay = () => (
  <div className="appLoadingOverlay">
    <div className="appLoadingOverlay__spinner" />
  </div>
);

// ---------- Обёртка Router + оверлей ----------
export const AppRouter = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <RouterProvider router={router} />
      {isLoading && <GlobalLoadingOverlay />}
    </>
  );
};