import React, { useEffect, useMemo } from "react";
import { Link, useMatches, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectAllCategories, fetchCategories } from "../../store/slices/categories";
import { selectAllProducts, selectSelectedProduct } from "../../store/slices/productsSlice";
import styles from "./index.module.css";

export function AutoBreadcrumbs() {
  const matches  = useMatches();
  const location = useLocation();

  // 1) пришли ли мы с конкретного списка (категория/все/распродажа)
  const stateCameFrom = location.state?.cameFrom;

  // 2) резерв по Redux: "all" | "sales" | "category:12" | "id:5" | null
  const rawSource = useSelector((s) => s.products.source);
  const { productsSource, productsCategoryId } = useMemo(() => {
    if (!rawSource) return { productsSource: null, productsCategoryId: null };
    if (rawSource.startsWith("category:")) {
      const id = Number(rawSource.split(":")[1]);
      return { productsSource: "category", productsCategoryId: Number.isFinite(id) ? id : null };
    }
    if (rawSource === "all")   return { productsSource: "all",   productsCategoryId: null };
    if (rawSource === "sales") return { productsSource: "sales", productsCategoryId: null };
    return { productsSource: null, productsCategoryId: null };
  }, [rawSource]);

  const categories      = useSelector(selectAllCategories);
  const products        = useSelector(selectAllProducts);
  const selectedProduct = useSelector(selectSelectedProduct);

  const dispatch = useDispatch();

  // подгружаем категории, чтобы у /categories/:id было имя
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  const fallbackFrom =
    productsSource === "category" && productsCategoryId != null
      ? { type: "category", id: productsCategoryId }
      : productsSource === "all"
      ? { type: "all" }
      : productsSource === "sales"
      ? { type: "sales" }
      : undefined;

  const cameFrom = stateCameFrom ?? fallbackFrom;

  // собираем крошки из route.handle.breadcrumb
  const items = matches.reduce((acc, m) => {
    const bc = m.handle?.breadcrumb;
    if (!bc) return acc;

    const res =
      typeof bc === "function"
        ? bc({
            params: m.params,
            categories,
            products,
            selectedProduct,
            cameFrom,
          })
        : bc;

    const normalize = (x) => {
      if (!x) return [];
      if (typeof x === "string") return [{ label: x, to: m.pathname ?? location.pathname }];
      if (Array.isArray(x)) return x.flatMap(normalize);
      if (typeof x === "object" && x.label) {
        return [{ label: x.label, to: x.to ?? (m.pathname ?? location.pathname) }];
      }
      return [];
    };

    return acc.concat(normalize(res));
  }, []);

  if (items.length <= 1) return null;

  return (
    <nav className={styles.bar} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li className={styles.item} key={`${it.label}-${i}`}>
              {isLast || !it.to ? (
                <span className={`${styles.pill} ${styles.current}`} aria-current="page">
                  {it.label}
                </span>
              ) : (
                <Link className={styles.pill} to={it.to}>
                  {it.label}
                </Link>
              )}

              {!isLast && <span className={styles.sep} aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
