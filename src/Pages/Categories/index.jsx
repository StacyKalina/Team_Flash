// Pages/Categories/index.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import placeHolderImage from "../../Images/placeholder.svg";

import {
  fetchCategories,
  // ✅ новые селекторы (вместо selectAllCategories / selectCategoriesStatus)
  selectCategoriesList,     // всегда массив []
  selectCategoriesItems,    // null | []  (нужно, чтобы не мигал "No categories" до запроса)
  selectCategoriesLoading,  // boolean
  selectCategoriesError,    // string | null
} from "../../store/slices/categories";

import { API_BASE_URL as BASE_URL } from "../../store/selectors/productsHelper";

// нормализуем относительный путь к абсолютному URL
const buildImageUrl = (relativePath) => {
  if (!relativePath) return undefined;
  if (/^https?:/i.test(relativePath)) return relativePath; // уже абсолютный
  const normalized = String(relativePath).replace(/^\/+/, ""); // убираем начальные /
  return `${BASE_URL}/${normalized}`;
};

export const CategoriesPage = () => {
  const dispatch   = useDispatch();

  // ✅ «булевая» схема для UI
  const categories = useSelector(selectCategoriesList);     // []
  const itemsNull  = useSelector(selectCategoriesItems);    // null | []
  const isLoading  = useSelector(selectCategoriesLoading);  // bool
  const error      = useSelector(selectCategoriesError);    // string|null
  const hasData    = categories.length > 0;

  // ✅ один вызов на маунте; повторы в сеть гасит condition в thunk
  useEffect(() => {

    console.log("CategoriesPage → dispatch(fetchCategories())"); // проверка
    
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="page__content sectionShell">
      <h2 className="sectionTitle">Categories</h2>

      {/* загрузка */}
      {isLoading && (
        <p className={styles.infoMessage}>Loading Categories…</p>
      )}

      {/* ошибка */}
      {error && (
        <p className={styles.infoMessage}>
          {error}
        </p>
      )}

      {/* ещё не запрашивали: items === null → ничего не показываем, чтобы не мигало */}
      {itemsNull === null && !isLoading && !error && (
        <p className={styles.infoMessage}></p>
      )}

      {/* успешно, но пусто */}
      {!isLoading && !error && itemsNull && categories.length === 0 && (
        <p className={styles.infoMessage}>No categories found yet.</p>
      )}

      {/* контент */}
      {hasData && (
        <div className={styles.cardsGrid}>
          {categories.map((category) => {
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
                      onError={(e) => {
                        e.currentTarget.src = placeHolderImage;
                      }}
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