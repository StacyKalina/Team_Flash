// Pages/AllProducts/index.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../store/slices/productsSlice";
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";
import styles from "./index.module.css";

export const AllProducts = () => {
  const dispatch   = useDispatch();
  const isLoading  = useSelector(selectProductsLoading);
  const error      = useSelector(selectProductsError);
  const items      = useSelector(selectAllProducts);
  const hasData    = items.length > 0;

  // Один вызов на маунте; повторы в сеть гасит condition в thunk
  useEffect(() => {
    console.log("AllProductsPage → dispatch(fetchCategories())"); // проверка
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <section className="page__content sectionShell">
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>All products</h1>
      </header>

      <FiltersBar />

      {isLoading && <p className={styles.stateMessage}>Loading…</p>}
      {error && <p className={styles.stateMessage}>Error: {error}</p>}
      {!isLoading && !error && !hasData && (
        <p className={styles.stateMessage}>No products found.</p>
      )}
      {hasData && <ProductsGrid cameFrom={{ type: "all" }} />}
    </section>
  );
};

export default AllProducts;
