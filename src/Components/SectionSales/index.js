// Components/SectionSales/index.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SectionHeader } from "../SectionHeader";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

import {
  fetchSalesProducts,
  selectProductsLoading,      // boolean
  selectProductsError,       // string | null
} from "../../store/slices/productsSlice";

import { selectVisibleProductCards } from "../../store/selectors/productsSelectors";
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
  const dispatch = useDispatch();

  // === Готовые карточки, как в ProductsGrid ===
  // Здесь уже лежат объекты в формате, который ждёт <ProductCard />:
  // { id, title, price, discont_price, oldPrice, discount, imageSrc, ... }
  const cards     = useSelector(selectVisibleProductCards);
  const isLoading = useSelector(selectProductsLoading);
  const error     = useSelector(selectProductsError);
  const hasData   = cards.length > 0;

  // === Один диспатч на маунт. Никаких зависимостей по status/source ===
  useEffect(() => {
    dispatch(fetchSalesProducts());
  }, [dispatch]);

  // === Просто берём 4 случайные карточки из уже подготовленных ===
  const randomCards = useMemo(
    () => (hasData ? getRandomFour(cards) : []),
    [cards, hasData]
  );

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
              {...card}              // здесь уже есть price + discont_price + oldPrice + discount
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
