import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectVisibleProductCards } from "../../store/selectors/productsSelectors";
import { addItem } from "../../store/slices/cartSlice";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

/**
 * ProductsGrid
 * -------------
 * Рендерит видимые карточки.
 * - Данные берём из Redux-селектора.
 * - Контекст "cameFrom" получает сверху (например, из Catalog) и
 *   прокидывает в ProductCard для корректных хлебных крошек.
 * - Добавление в корзину — диспатчим addItem.
 */
export const ProductsGrid = ({ cameFrom }) => {
  const cards = useSelector(selectVisibleProductCards);
  const dispatch = useDispatch();

  if (!cards || cards.length === 0) {
    return <p className={styles.stateMessage}>No products found.</p>;
  }

  const handleAddToCart = (product) => dispatch(addItem(product));

  return (
    <div className={styles.cardsGrid}>
      {cards.map((card) => (
        <ProductCard
          key={card.id}
          {...card}
          cameFrom={cameFrom}          // для хлебных крошек
          onAddToCart={handleAddToCart} // добавить в корзину
        />
      ))}
    </div>
  );
};