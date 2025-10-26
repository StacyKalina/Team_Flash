import React from "react";
import { useSelector } from "react-redux";

import { selectVisibleProductCards } from "../../store/selectors/productsSelectors";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

/**
 * ProductsGrid
 * -------------
 * Отвечает только за рендер видимых карточек товаров.
 * Источник данных (filter/search/sort) — СТОРОНА REDUX (селектор).
 * Контекст "откуда пришли" (cameFrom) — ПОЛУЧАЕМ СВЕРХУ (например, из Catalog).
 * Никакой авто-магии по URL, только переданный проп.
 */
export const ProductsGrid = ({ cameFrom }) => {
  const cards = useSelector(selectVisibleProductCards);

  if (!cards?.length) {
    return <p className={styles.stateMessage}>No products found.</p>;
  }

  return (
    <div className={styles.cardsGrid}>
      {cards.map((card) => (
        <ProductCard
          key={card.id}
          {...card}
          cameFrom={cameFrom} // ← прокидываем дальше в карточку (для хлебных крошек)
        />
      ))}
    </div>
  );
};
