// Components/Breadcrumbs/index.js
import React, { useEffect, useMemo } from "react";
import { Link, useMatches, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchCategories,
  // ✅ новый селектор: всегда массив []
  selectCategoriesList,
} from "../../store/slices/categories";

import {
  selectAllProducts,
  selectSelectedProduct,
} from "../../store/slices/productsSlice";

import styles from "./index.module.css";

export function AutoBreadcrumbs() {
  const matches = useMatches();
  const location = useLocation();
  const dispatch = useDispatch();

  // 1) Пришли ли мы с конкретного списка (категория/все/распродажа) — передаём из navigate(..., { state })
  const stateCameFrom = location.state?.cameFrom;

  // 2) Резерв по Redux (новая схема):
  //    source: 'all' | 'sales' | 'category' | 'id' | 'none'
  //    currentCategoryId: number | null
  const productsSource = useSelector((s) => s.products.source);
  const productsCategoryId = useSelector((s) => s.products.currentCategoryId);

  // Категории (для названия в /categories/:id)
  const categories = useSelector(selectCategoriesList); // []
  const products = useSelector(selectAllProducts);      // []
  const selectedProduct = useSelector(selectSelectedProduct); // объект | null

  // ✅ Одна попытка загрузки категорий на маунт.
  //   Дубликаты запросов блокируются condition в thunk (в slice).
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Резервный "cameFrom" из стора, если не передали через location.state
  const fallbackFrom = useMemo(() => {
    if (productsSource === "category" && productsCategoryId != null) {
      return { type: "category", id: Number(productsCategoryId) };
    }
    if (productsSource === "all") return { type: "all" };
    if (productsSource === "sales") return { type: "sales" };
    return undefined;
  }, [productsSource, productsCategoryId]);

  const cameFrom = stateCameFrom ?? fallbackFrom;

  // Собираем крошки из route.handle.breadcrumb
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
      if (typeof x === "string") {
        return [{ label: x, to: m.pathname ?? location.pathname }];
      }
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
