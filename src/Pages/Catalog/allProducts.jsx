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
  const dispatch = useDispatch();
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const items = useSelector(selectAllProducts);

  // Фазы загрузки
  const isPriming  = items === null && isLoading;   // первая загрузка → скелетон
  const isUpdating = items !== null && isLoading;   // повторная → оверлей
  const hasData    = Array.isArray(items) && items.length > 0;

  // Один вызов на маунте; повторные запросы блокируются condition в thunk
  useEffect(() => {
    console.log("AllProductsPage → dispatch(fetchAllProducts())");
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <section className="page__content sectionShell">
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>All products</h1>
      </header>

      <FiltersBar />

      {isPriming && (
        <div className={styles.skeletonWrapper}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonBox}></div>
          ))}
        </div>
      )}

      {!isPriming && error && (
        <div className={styles.errorBox}>
          <p>Etwas ist schiefgelaufen.</p>
          <p className="small">Bitte versuchen Sie es später erneut.</p>
        </div>
      )}

      {!isPriming && !error && !hasData && (
        <p className={styles.stateMessage}>No products found.</p>
      )}

      {hasData && (
        <div className={styles.gridWrapper}>
          <ProductsGrid cameFrom={{ type: "all" }} />
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

export default AllProducts;