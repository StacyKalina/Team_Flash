// Components/SectionSales/index.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SectionHeader } from "../SectionHeader";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

import { fetchSalesProducts,
         selectAllProducts,          // всегда массив ([])
         selectProductsLoading,      // boolean
         selectProductsError         // string | null
} from "../../store/slices/productsSlice";

import { mapProductToCard } from "../../store/selectors/productsHelper"; 
import { addItem } from "../../store/slices/cartSlice";

// Берём 4 случайных карты (Фишер–Йетс)
function getRandomFour(arr) {
  if (!Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 4);
}

export const SectionSales = () => {
  const dispatch    = useDispatch();

  // === Чистые селекторы из productsSlice ===
  const items       = useSelector(selectAllProducts);     // []
  const isLoading   = useSelector(selectProductsLoading); // bool
  const error       = useSelector(selectProductsError);   // string|null
  const hasData     = items.length > 0;

  // === Один диспатч на маунт. Никаких зависимостей по status/source ===
  useEffect(() => {
    dispatch(fetchSalesProducts());
  }, [dispatch]);

  // === Готовим карточки и берём 4 случайные ===
  const randomCards = useMemo(() => {
    if (!hasData) return [];
    const cards = items.map(mapProductToCard);
    return getRandomFour(cards);
  }, [items, hasData]);

  const handleAddToCart = (product) => dispatch(addItem(product));

  return (
    <section className="sectionShell">
      <SectionHeader
        title="Sale"
        buttonText="Alle Sales"
        fromRouterPath="/sales"
      />

      {isLoading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!isLoading && !error && !hasData && (
        <p className={styles.infoMessage}>No discounted products yet.</p>
      )}

      {randomCards.length > 0 && (
        <div className={styles.cardsGrid}>
          {randomCards.map((card) => (
            <ProductCard
              key={card.id}
              {...card}
              currencySymbol="$"
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SectionSales;
