import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesProducts } from "../../store/slices/productsSlice";
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";
import styles from "./index.module.css";

export const Sales = () => {
  const dispatch = useDispatch();
  const { status, error, source } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle" || source !== "sales") {
      dispatch(fetchSalesProducts());
    }
  }, [status, source, dispatch]);


  return (
    <section className="sectionWrapper">
      <div className="sectionShell">

        <header className={styles.header}>
          <h1 className={styles.pageTitle}>All sales</h1>
        </header>

        <FiltersBar hideDiscountToggle />
        {status === "loading" && <p className={styles.stateMessage}>Loading…</p>}
        {status === "failed" && <p className={styles.stateMessage}>Error: {error}</p>}
        {status === "succeeded" && <ProductsGrid cameFrom={{ type: "sales" }} />}

      </div>
    </section>
  );
};
