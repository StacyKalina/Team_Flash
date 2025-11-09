import React from "react";
import styles from "./index.module.css";
import { ProductCardSkeleton } from "../ProductCard/Skeleton";

export const ProductsGridSkeleton = ({ count = 6 }) => {
  return (
    <div className={styles.cardsGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
