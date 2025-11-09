// Pages/Catalog/categoryProducts.jsx
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

import { selectCategoriesList } from "../../store/slices/categories";
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";
import { ProductsGridSkeleton } from "../../Components/ProductsGrid/SkeletonGrid";
import styles from "./index.module.css";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const catIdNum = useMemo(() => Number(categoryId), [categoryId]);

  // --- данные из Redux ---
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectCategoriesList);

  // --- вычисляем заголовок категории ---
  const category = categories.find((c) => Number(c.id) === catIdNum);
  const pageTitle = category?.title || category?.name || `Category #${categoryId}`;

  // --- фазы загрузки ---
  const isPriming = products === null && isLoading; // первая загрузка → скелетон
  const isUpdating = products !== null && isLoading; // повторная → оверлей
  const hasData = Array.isArray(products) && products.length > 0;

  // --- контролируем подгрузку ---
  const lastCatRef = useRef(null);
  useEffect(() => {
    // если категория изменилась — чистим старые товары и грузим новые
    if (lastCatRef.current !== categoryId) {
      lastCatRef.current = categoryId;
      dispatch(clearProducts());
      dispatch(fetchProductsByCategory(categoryId));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [dispatch, categoryId]);

  return (
    <section className="page__content sectionShell">
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </header>

      <FiltersBar />

      {/* --- Первая загрузка — скелетон --- */}
      {isPriming && <ProductsGridSkeleton count={6} />}

      {/* --- Ошибка загрузки --- */}
      {!isPriming && error && (
        <div className={styles.errorBox}>
          <p>Etwas ist schiefgelaufen.</p>
          <p className="small">Bitte versuchen Sie es später erneut.</p>
        </div>
      )}

      {/* --- Пустая категория --- */}
      {!isPriming && !error && !hasData && (
        <p className={styles.stateMessage}>No products in this category yet.</p>
      )}

      {/* --- Отображаем товары --- */}
      {hasData && (
        <div className={styles.gridWrapper}>
          <ProductsGrid cameFrom={{ type: "category", id: catIdNum }} />
          {isUpdating && (
            <div className={styles.overlay}>
              <div className={styles.spinner}></div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Catalog;
