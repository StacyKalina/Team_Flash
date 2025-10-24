  // Components/SectionSales/index.jsx
  import React, { useEffect, useMemo } from "react";
  import { useDispatch, useSelector } from "react-redux";

  import { SectionHeader } from "../SectionHeader";
  import { ProductCard } from "../ProductCard";
  import styles from "./index.module.css";

  import { fetchSalesProducts } from "../../store/slices/productsSlice";
  import { mapProductToCard } from "../../store/selectors/productsHelper"; // если у тебя helper в другом пути — поправь импорт

  // рэндомные 4 элемента (Фишер–Йетс)
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

    // На главной просто убедимся, что в сторе именно sale-товары
    useEffect(() => {
      if (status === "idle" || source !== "sales") {
        dispatch(fetchSalesProducts());
      }
    }, [dispatch, status, source]);

    // Преобразуем товары -> пропсы карточки и возьмём 4 случайных
    const randomCards = useMemo(() => {
      if (!Array.isArray(items) || !items.length) return [];
      const cards = items.map((p) => mapProductToCard(p));
      return getRandomFour(cards);
    }, [items]);

    return (
      <div className="sectionWrapper">
        <SectionHeader
          title="Sale"
          buttonText="Alle Sales"
          fromRouterPath="/sales"
        />

        {status === "loading" && <p>Loading…</p>}
        {status === "failed"   && <p style={{ color: "crimson" }}>{error || "Etwas ist schiefgelaufen"}</p>}

        {status === "succeeded" && (
          randomCards.length ? (
            <div className={styles.cardsGrid}>
              {randomCards.map((card) => (
                <ProductCard key={card.id} {...card} currencySymbol="€" />
              ))}
            </div>
          ) : (
            <p className={styles.infoMessage}>No discounted products yet.</p>
          )
        )}
      </div>
    );
  };

  export default SectionSales;
