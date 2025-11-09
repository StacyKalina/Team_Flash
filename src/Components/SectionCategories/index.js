// Components/SectionCategories/index.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { SectionHeader } from "../SectionHeader";
import styles from "./index.module.css";

import {
  fetchCategories,
  selectCategoriesList,     // всегда массив ([])
  selectCategoriesLoading, // boolean
  selectCategoriesError    // string | null
} from "../../store/slices/categories";

import placeHolderImage from "../../Images/placeholder.svg";

// === Случайные 4 категории
function getRandomFour(arr) {
  if (!Array.isArray(arr)) return [];
  const copyArr = [...arr];
  for (let i = copyArr.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[newIndex]] = [copyArr[newIndex], copyArr[i]];
  }
  return copyArr.slice(0, 4);
}

const BASE_URL = "http://localhost:3333";
const buildImageUrl = (relativePath) => {
  if (!relativePath) return undefined;
  if (/^https?:/i.test(relativePath)) return relativePath; // уже абсолютный
  const normalized = String(relativePath).replace(/^\/+/, "");
  return `${BASE_URL}/${normalized}`;
};

export const SectionCategories = () => {
  const dispatch   = useDispatch();

  // === Новые селекторы slice ===
  const categories = useSelector(selectCategoriesList);     // []
  const isLoading  = useSelector(selectCategoriesLoading);  // bool
  const error      = useSelector(selectCategoriesError);    // string|null
  const hasData    = categories.length > 0;

  // === Один диспатч на маунт (повторы гасит condition в thunk)
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const randomCategories = useMemo(
    () => getRandomFour(categories),
    [categories]
  );

  return (
    <section className={`sectionShell ${styles.root}`}>
      <SectionHeader
        title="Categories"
        buttonText="All Categories"
        fromRouterPath="/categories"
      />

      {isLoading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {!isLoading && !error && !hasData && (
        <p className={styles.infoMessage}>No categories found yet.</p>
      )}

      {hasData && (
        <div className={styles.cardsGrid}>
          {randomCategories.map((category) => {
            const title = category.title ?? category.name ?? "Category";
            const imageSrc = buildImageUrl(category.image) ?? placeHolderImage;

            return (
              <div className={styles.imgWrapper} key={category.id}>
                <Link
                  className={styles.categoryCard}
                  to={`/categories/${category.id}`}
                >
                  <div className={styles.thumbWrapper}>
                    <img
                      src={imageSrc}
                      alt={title}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = placeHolderImage; }}
                    />
                  </div>
                  <p className={styles.caption}>{title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
