// Pages/Sales/index.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalesProducts,
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../store/slices/productsSlice";
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";
import styles from "./index.module.css";

export const Sales = () => {
  const dispatch   = useDispatch();
  const isLoading  = useSelector(selectProductsLoading);
  const error      = useSelector(selectProductsError);
  const items      = useSelector(selectAllProducts);
  const hasData    = items.length > 0;

  // один вызов на маунте; повторные вызовы в сеть гасит condition в thunk
  useEffect(() => {
         console.log("SalesPage → dispatch(fetchSalesProducts())"); // проверка
    dispatch(fetchSalesProducts());
  }, [dispatch]);

  return (
    <section className="page__content sectionShell">
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>All sales</h1>
      </header>

      <FiltersBar hideDiscountToggle />

      {isLoading && <p className={styles.stateMessage}>Loading…</p>}
      {error && <p className={styles.stateMessage}>Error: {error}</p>}
      {!isLoading && !error && !hasData && (
        <p className={styles.stateMessage}>No discounted products yet.</p>
      )}
      {hasData && <ProductsGrid cameFrom={{ type: "sales" }} />}
    </section>
  );
};

export default Sales;
