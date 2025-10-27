import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleProductCards } from "../../store/selectors/productsSelectors";
import { addItem } from "../../store/slices/cartSlice";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

export const ProductsGrid = () => {
  const cards = useSelector(selectVisibleProductCards);
  const dispatch = useDispatch();

  if (!cards.length) {
    return <p className={styles.stateMessage}>No products found.</p>;
  }

  return (
    <div className={styles.cardsGrid}>
      {cards.map((card) => (
        <ProductCard
          key={card.id}
          {...card}
          onAddToCart={(product) => dispatch(addItem(product))}
        />
      ))}
    </div>
  );
};
