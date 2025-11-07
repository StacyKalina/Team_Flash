import { createSlice, nanoid } from "@reduxjs/toolkit";

/**
 * Нормализуем количество: минимум 1, целое число
 */
const ensureQuantity = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

/**
 * Эффективная (фактическая) цена для строки корзины:
 * если есть корректная скидочная цена — используем её, иначе базовую price
 */
const effectiveUnitPrice = (item) =>
  (typeof item?.discont_price === "number" && item.discont_price > 0
    ? item.discont_price
    : item.price);

/**
 * Пересчёт тоталов корзины
 */
const recalculateTotals = (state) => {
  state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  state.totalPrice = state.items.reduce(
    (acc, item) => acc + item.quantity * effectiveUnitPrice(item),
    0
  );
};

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Полная замена корзины (например, гидратация из localStorage/сервера)
     * Ожидает массив объектов с полями: id, title, price, oldPrice?, imageSrc?, discount?, discont_price?, quantity?
     */
    hydrateCart(state, action) {
      const { items = [] } = action.payload ?? {};
      state.items = items.map((item) => ({
        id: item.id ?? nanoid(),
        title: item.title,
        price: item.price,
        oldPrice: item.oldPrice ?? null,
        // скидочная цена: если есть — будет применяться при подсчётах
        discont_price:
          typeof item.discont_price === "number" ? item.discont_price : null,
        discount: item.discount ?? null,
        imageSrc: item.imageSrc ?? null,
        quantity: ensureQuantity(item.quantity),
      }));
      recalculateTotals(state);
    },

    /**
     * Добавить товар в корзину (или увеличить количество, если он уже есть)
     * payload: { id, title, price, oldPrice?, discont_price?, discount?, imageSrc?, quantity? }
     */
    addItem(state, action) {
      const item = action.payload;
      const quantity = ensureQuantity(item.quantity);

      const existing = state.items.find((entry) => entry.id === item.id);
      if (existing) {
        // если уже есть — просто увеличиваем количество
        existing.quantity += quantity;

        // опционально можно обновлять цены/картинку, если пришли новые значения
        if (typeof item.price === "number") existing.price = item.price;
        if (typeof item.discont_price === "number")
          existing.discont_price = item.discont_price;
        if (item.oldPrice !== undefined) existing.oldPrice = item.oldPrice ?? null;
        if (item.discount !== undefined) existing.discount = item.discount ?? null;
        if (item.imageSrc !== undefined) existing.imageSrc = item.imageSrc ?? null;
      } else {
        // если ещё нет — создаём новую строку корзины
        state.items.push({
          id: item.id ?? nanoid(),
          title: item.title,
          price: item.price,
          oldPrice: item.oldPrice ?? null,
          discont_price:
            typeof item.discont_price === "number" ? item.discont_price : null,
          discount: item.discount ?? null,
          imageSrc: item.imageSrc ?? null,
          quantity,
        });
      }

      recalculateTotals(state);
    },

    /**
     * Увеличить количество
     */
    incrementItem(state, action) {
      const { id, amount = 1 } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) {
        item.quantity += ensureQuantity(amount);
        recalculateTotals(state);
      }
    },

    /**
     * Уменьшить количество (не ниже 1)
     */
    decrementItem(state, action) {
      const { id, amount = 1 } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (item) {
        const next = item.quantity - ensureQuantity(amount);
        item.quantity = next > 0 ? next : 1;
        recalculateTotals(state);
      }
    },

    /**
     * Удалить товар из корзины
     */
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((entry) => entry.id !== id);
      recalculateTotals(state);
    },

    /**
     * Очистить корзину
     */
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  hydrateCart,
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;