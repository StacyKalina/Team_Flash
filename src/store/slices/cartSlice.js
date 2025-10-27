import { createSlice, nanoid } from "@reduxjs/toolkit";

const ensureQuantity = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const recalculateTotals = (state) => {
    state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
    state.totalPrice = state.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
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
        hydrateCart(state, action) {
            const { items = [] } = action.payload ?? {};
            state.items = items.map((item) => ({
                id: item.id ?? nanoid(),
                title: item.title,
                price: item.price,
                oldPrice: item.oldPrice ?? null,
                imageSrc: item.imageSrc ?? null,
                quantity: ensureQuantity(item.quantity),
            }));
            recalculateTotals(state);
        },
        addItem(state, action) {
            const item = action.payload;
            const quantity = ensureQuantity(item.quantity);
            const existing = state.items.find((entry) => entry.id === item.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items.push({
                    id: item.id ?? nanoid(),
                    title: item.title,
                    price: item.price,
                    oldPrice: item.oldPrice ?? null,
                    imageSrc: item.imageSrc ?? null,
                    quantity,
                });
            }
            recalculateTotals(state);
        },
        incrementItem(state, action) {
            const { id, amount = 1 } = action.payload;
            const item = state.items.find((entry) => entry.id === id);
            if (item) {
                item.quantity += ensureQuantity(amount);
                recalculateTotals(state);
            }
        },
        decrementItem(state, action) {
            const { id, amount = 1 } = action.payload;
            const item = state.items.find((entry) => entry.id === id);
            if (item) {
                const next = item.quantity - ensureQuantity(amount);
                item.quantity = next > 0 ? next : 1;
                recalculateTotals(state);
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            state.items = state.items.filter((entry) => entry.id !== id);
            recalculateTotals(state);
        },
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
