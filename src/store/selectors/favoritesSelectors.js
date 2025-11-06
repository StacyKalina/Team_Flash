import { createSelector } from "@reduxjs/toolkit";
import { resolvePricing, mapProductToCard } from "./productsHelper";

const selectFavoritesItems = (state) => state.favorites.items ?? [];
const selectFavoriteFilters = (state) => state.favoriteFilters ?? {};

export const selectFilteredAndSortedFavorites = createSelector(
  [selectFavoritesItems, selectFavoriteFilters],
  (favorites, filters) => {
    if (!Array.isArray(favorites) || favorites.length === 0) {
      return [];
    }

    const priceFrom = Number.parseFloat(filters.priceFrom);
    const priceTo = Number.parseFloat(filters.priceTo);
    const sortOrder = filters.sortOrder ?? "default";

    const enriched = favorites
      .map((product) => ({ product, pricing: resolvePricing(product) }))
      .filter(({ pricing }) => {
        if (!Number.isNaN(priceFrom) && pricing.currentPrice < priceFrom) {
          return false;
        }
        if (!Number.isNaN(priceTo) && pricing.currentPrice > priceTo) {
          return false;
        }
        return true;
      });

    if (sortOrder === "priceAsc") {
      enriched.sort((a, b) => a.pricing.currentPrice - b.pricing.currentPrice);
    } else if (sortOrder === "priceDesc") {
      enriched.sort((a, b) => b.pricing.currentPrice - a.pricing.currentPrice);
    }

    return enriched.map(({ product, pricing }) => {
      const productForMapping = {
        ...product,
        image: product.image ?? product.imageSrc ?? product.imageUrl ?? "",
      };
      const card = mapProductToCard(productForMapping, pricing);
      return {
        ...card,
        imageSrc: product.imageSrc ?? card.imageSrc,
      };
    });
  }
);
