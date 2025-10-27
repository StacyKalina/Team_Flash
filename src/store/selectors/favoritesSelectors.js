import { createSelector } from "@reduxjs/toolkit";
import { resolvePricing, mapProductToCard } from "./productsHelper";

// --- Базовые селекторы ---
const selectFavoritesItems = (state) => state.favorites.items;
const selectFilters = (state) => state.filters;

export const selectFilteredAndSortedFavorites = createSelector(
  [selectFavoritesItems, selectFilters],
  (favorites, filters) => {
    if (!Array.isArray(favorites)) return [];

    const priceFrom = parseFloat(filters.priceFrom);
    const priceTo = parseFloat(filters.priceTo);
    const sortOrder = filters.sortOrder;

    let enriched = favorites.map((p) => ({ p, pricing: resolvePricing(p) }));

    // Фильтрация по цене
    enriched = enriched.filter(({ pricing }) => {
      if (!Number.isNaN(priceFrom) && pricing.currentPrice < priceFrom)
        return false;
      if (!Number.isNaN(priceTo) && pricing.currentPrice > priceTo)
        return false;
      return true;
    });

    // Сортировка
    if (sortOrder === "priceAsc")
      enriched.sort((a, b) => a.pricing.currentPrice - b.pricing.currentPrice);
    else if (sortOrder === "priceDesc")
      enriched.sort((a, b) => b.pricing.currentPrice - a.pricing.currentPrice);
    

    return enriched.map(({ p, pricing }) => ({
  ...mapProductToCard(p, pricing),
  imageSrc: p.imageSrc || p.image, // если у тебя разные названия
}))});

    // Возвращаем данные для карточек
//     return enriched.map(({ p, pricing }) => mapProductToCard(p, pricing));
//   }
// );
