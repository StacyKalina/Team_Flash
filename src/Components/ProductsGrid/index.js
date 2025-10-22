import React from "react";
import { useSelector } from "react-redux";
import { selectVisibleProductCards } from "../../store/selectors/productsSelectors";
import { useCart } from "../../context/CartContext";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

export const ProductsGrid = () => {
  const cards = useSelector(selectVisibleProductCards);
  const { addItem } = useCart();

  if (!cards.length) {
    return <p className={styles.stateMessage}>No products found.</p>;
  }

  return (
    <div className={styles.cardsGrid}>
      {cards.map((card) => (
        <ProductCard key={card.id} {...card} onAddToCart={addItem} />
      ))}
    </div>
  );
};
