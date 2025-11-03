import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchProductsByCategory,
  clearProducts,
  selectProductsStatus,
  selectProductsError,
  selectAllProducts
} from "../../store/slices/productsSlice";

import { selectAllCategories } from "../../store/slices/categories"; // есть у тебя
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";

import styles from "./index.module.css";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();           // строка из URL
  const catIdNum = useMemo(() => Number(categoryId), [categoryId]);

  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectAllProducts);

  // Достанем заголовок категории из уже загруженных категорий (если есть)
  const categories = useSelector(selectAllCategories);
  const category = categories.find(c => Number(c.id) === catIdNum);
  const pageTitle = category?.title || category?.name || `Category #${categoryId}`;

  // Чтобы не мигали старые товары при переключении категории:
  // 1) чистим список
  // 2) грузим новые
  // делаем 1 раз на каждое изменение categoryId
  const lastCatRef = useRef(null);
  useEffect(() => {
    if (lastCatRef.current === categoryId) return;
    lastCatRef.current = categoryId;

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

        {status === "loading" && <p className={styles.stateMessage}>Loading…</p>}
        {status === "failed" && (
          <p className={styles.stateMessage}>
            Error: {error || "Failed to load products for this category"}
          </p>
        )}
        {status === "succeeded" && (
          products?.length
            ? <ProductsGrid cameFrom={{ type: "category", id: Number(categoryId) }} />
            : <p className={styles.stateMessage}>No products in this category yet.</p>
        )}

    </section>
  );
};

export default Catalog;
