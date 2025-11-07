// Pages/Catalog/index.jsx
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchProductsByCategory,
  clearProducts,
  selectProductsLoading,
  selectProductsError,
  selectAllProducts,
} from "../../store/slices/productsSlice";

import { selectCategoriesList } from "../../store/slices/categories"; // <- новый селектор (всегда массив)
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";

import styles from "./index.module.css";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();                  // строка из URL
  const catIdNum = useMemo(() => Number(categoryId), [categoryId]);

  // булевые/простые селекторы
  const isLoading = useSelector(selectProductsLoading);
  const error     = useSelector(selectProductsError);
  const products  = useSelector(selectAllProducts);
  const hasData   = Array.isArray(products) && products.length > 0;

  // заголовок категории (если уже загружены категории)
  const categories = useSelector(selectCategoriesList);
  const category   = categories.find(c => Number(c.id) === catIdNum);
  const pageTitle  = category?.title || category?.name || `Category #${categoryId}`;

  // Защита от двойного эффекта в StrictMode + загрузка при смене categoryId
  const lastCatRef = useRef(null);
  useEffect(() => {
    if (lastCatRef.current === categoryId) return;
    lastCatRef.current = categoryId;

    // очищаем список, чтобы не мигали старые товары, и запрашиваем новые
    dispatch(clearProducts());
    dispatch(fetchProductsByCategory(categoryId));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, categoryId]);

  return (
    <section className="page__content sectionShell">
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </header>

      <FiltersBar />

      {isLoading && <p className={styles.stateMessage}>Loading…</p>}
      {error && (
        <p className={styles.stateMessage}>
          Error: {error || "Failed to load products for this category"}
        </p>
      )}
      {!isLoading && !error && !hasData && (
        <p className={styles.stateMessage}>No products in this category yet.</p>
      )}
      {hasData && (
        <ProductsGrid cameFrom={{ type: "category", id: Number(categoryId) }} />
      )}
    </section>
  );
};

export default Catalog;
