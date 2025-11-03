// Components/SectionSales/index.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SectionHeader } from "../SectionHeader";
import { ProductCard } from "../ProductCard";
import styles from "./index.module.css";

import { fetchSalesProducts } from "../../store/slices/productsSlice";
import { mapProductToCard } from "../../store/selectors/productsHelper"; 
import { addItem } from "../../store/slices/cartSlice";

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
  const { items, status, error, source } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle" || source !== "sales") {
      dispatch(fetchSalesProducts());
    }
  }, [dispatch, status, source]);

  const randomCards = useMemo(() => {
    if (!Array.isArray(items) || !items.length) return [];
    const cards = items.map((product) => mapProductToCard(product));
    return getRandomFour(cards);
  }, [items]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <section className="sectionShell">
      <SectionHeader
        title="Sale"
        buttonText="Alle Sales"
        fromRouterPath="/sales"
      />

      {status === "loading" && <p>Loading…</p>}
      {status === "failed" && (
        <p style={{ color: "crimson" }}>{error || "Etwas ist schiefgelaufen"}</p>
      )}

      {status === "succeeded" &&
        (randomCards.length ? (
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
        ) : (
          <p className={styles.infoMessage}>No discounted products yet.</p>
        ))}
    </section>
  );
};

export default SectionSales;
