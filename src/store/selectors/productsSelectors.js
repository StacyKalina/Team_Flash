// 

import { createSelector } from "@reduxjs/toolkit";
import { resolvePricing, mapProductToCard } from "./productsHelper";

// --- базовые селекторы ---
const selectProducts = (state) => state.products.items;
const selectFilters = (state) => state.filters;
const selectSelectedProduct = (state) => state.products.selectedProduct;

// --- список карточек товаров  ---
export const selectVisibleProductCards = createSelector(
[selectProducts, selectFilters],
(products, filters) => {
if (!Array.isArray(products)) return [];

const priceFrom = parseFloat(filters.priceFrom);
const priceTo = parseFloat(filters.priceTo);
const discountOnly = !!filters.discountOnly;
const sortOrder = filters.sortOrder;

let enriched = products.map((p) => ({ p, pricing: resolvePricing(p) }));

// фильтрация
  enriched = enriched.filter(({ pricing }) => {
  if (!Number.isNaN(priceFrom) && pricing.currentPrice < priceFrom) return false;
  if (!Number.isNaN(priceTo) && pricing.currentPrice > priceTo) return false;
  if (discountOnly && !pricing.hasDiscount) return false;
  return true;
  });

// сортировка
if (sortOrder === "priceAsc")
enriched.sort((a, b) => a.pricing.currentPrice - b.pricing.currentPrice);
else if (sortOrder === "priceDesc")
enriched.sort((a, b) => b.pricing.currentPrice - a.pricing.currentPrice);
else if (sortOrder === "discountDesc")
enriched.sort(
(a, b) => (b.pricing.discountPercent ?? 0) - (a.pricing.discountPercent ?? 0)
);

// возвращаем данные для карточек
return enriched.map(({ p, pricing }) => mapProductToCard(p, pricing));
}
);

// ---  новый селектор: один товар (для страницы ProductDetail) ---
export const selectProductById = (productId) =>
createSelector([selectProducts], (products) =>
products.find((product) => product.id === Number(productId))
);

// ---  селектор выбранного товара из Redux (если загружен по API) ---
export const selectSelectedProductItem = createSelector(
[selectSelectedProduct],
(selectedProduct) => selectedProduct
);