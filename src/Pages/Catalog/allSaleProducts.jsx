// Pages/Sales/index.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalesProducts,
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../store/slices/productsSlice";
import { FiltersBar } from "../../Components/FiltersBar";
import { ProductsGrid } from "../../Components/ProductsGrid";
import { ProductsGridSkeleton } from "../../Components/ProductsGrid/SkeletonGrid";
import styles from "./index.module.css";

export const Sales = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const items = useSelector(selectAllProducts);

  const isPriming = items === null && isLoading;
  const isUpdating = items !== null && isLoading;
  const hasData = Array.isArray(items) && items.length > 0;

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

     {isPriming && <ProductsGridSkeleton count={6} />}

      {!isPriming && error && (
        <div className={styles.errorBox}>
          <p>Etwas ist schiefgelaufen.</p>
          <p className="small">Bitte versuchen Sie es später erneut.</p>
        </div>
      )}

      {!isPriming && !error && !hasData && (
        <p className={styles.stateMessage}>No discounted products yet.</p>
      )}

      {hasData && (
        <div className={styles.gridWrapper}>
          <ProductsGrid cameFrom={{ type: "sales" }} />
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

export default Sales;
