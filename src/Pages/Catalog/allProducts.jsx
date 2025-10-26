import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  selectProductsStatus,
  selectProductsError,
} from "../../store/slices/productsSlice";
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";
import styles from "./index.module.css";

export const AllProducts = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectProductsError);
  const status = useSelector(selectProductsStatus);
  const source = useSelector((s) => s.products.source);

  useEffect(() => {
    if (status === "idle" || source !== "all") {
      dispatch(fetchAllProducts());
    }
  }, [status, source, dispatch]);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>All products</h1>
      </header>

      <FiltersBar />

      {status === "loading" && <p className={styles.stateMessage}>Loading…</p>}
      {status === "failed" && <p className={styles.stateMessage}>Error: {error}</p>}
      {status === "succeeded" && <ProductsGrid cameFrom={{ type: "all" }} />}
    </section>
  );
};
