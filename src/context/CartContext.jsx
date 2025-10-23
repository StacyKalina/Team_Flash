import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(undefined);

const STORAGE_KEY = "cart_state";

const readStoredItems = () => {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        if (parsed && Array.isArray(parsed.items)) {
            return parsed.items;
        }
    } catch (error) {
        console.warn("Failed to read cart from storage", error);
    }
    return [];
};

const writeStoredItems = (items) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.warn("Failed to persist cart to storage", error);
    }
};

const initialState = {
    items: [],
};

const ensureQuantity = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const { item } = action.payload;
            const quantityToAdd = ensureQuantity(item.quantity);

            const existingItem = state.items.find((entry) => entry.id === item.id);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((entry) =>
                        entry.id === item.id
                            ? { ...entry, quantity: entry.quantity + quantityToAdd }
                            : entry
                    ),
                };
            }

            const sanitizedItem = {
                id: item.id,
                title: item.title,
                price: item.price,
                oldPrice: item.oldPrice ?? null,
                imageSrc: item.imageSrc ?? null,
                quantity: quantityToAdd,
            };

            return {
                ...state,
                items: [...state.items, sanitizedItem],
            };
        }

        case "INCREMENT_ITEM": {
            const { id, amount = 1 } = action.payload;
            const incrementAmount = ensureQuantity(amount);
            return {
                ...state,
                items: state.items.map((entry) =>
                    entry.id === id
                        ? { ...entry, quantity: entry.quantity + incrementAmount }
                        : entry
                ),
            };
        }

        case "DECREMENT_ITEM": {
            const { id, amount = 1 } = action.payload;
            const decrementAmount = ensureQuantity(amount);
            return {
                ...state,
                items: state.items.map((entry) => {
                    if (entry.id !== id) {
                        return entry;
                    }
                    const nextQuantity = entry.quantity - decrementAmount;
                    return {
                        ...entry,
                        quantity: nextQuantity > 0 ? nextQuantity : 1,
                    };
                }),
            };
        }

        case "REMOVE_ITEM": {
            const { id } = action.payload;
            return {
                ...state,
                items: state.items.filter((entry) => entry.id !== id),
            };
        }

        case "CLEAR_CART": {
            return {
                ...state,
                items: [],
            };
        }

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, (baseState) => {
        if (typeof window === "undefined") {
            return baseState;
        }
        const storedItems = readStoredItems();
        if (!storedItems.length) {
            return baseState;
        }
        return {
            ...baseState,
            items: storedItems.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                oldPrice: item.oldPrice ?? null,
                imageSrc: item.imageSrc ?? null,
                quantity: ensureQuantity(item.quantity),
            })),
        };
    });

    const totals = useMemo(() => {
        const totalItems = state.items.reduce((acc, entry) => acc + entry.quantity, 0);
        const totalPrice = state.items.reduce(
            (acc, entry) => acc + entry.price * entry.quantity,
            0
        );

        return { totalItems, totalPrice };
    }, [state.items]);

    useEffect(() => {
        writeStoredItems(state.items);
    }, [state.items]);

    const value = useMemo(() => {
        const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: { item } });
        const incrementItem = (id, amount = 1) =>
            dispatch({ type: "INCREMENT_ITEM", payload: { id, amount } });
        const decrementItem = (id, amount = 1) =>
            dispatch({ type: "DECREMENT_ITEM", payload: { id, amount } });
        const removeItem = (id) =>
            dispatch({ type: "REMOVE_ITEM", payload: { id } });
        const clearCart = () => dispatch({ type: "CLEAR_CART" });

        return {
            items: state.items,
            addItem,
            incrementItem,
            decrementItem,
            removeItem,
            clearCart,
            totalItems: totals.totalItems,
            totalPrice: totals.totalPrice,
        };
    }, [state.items, totals.totalItems, totals.totalPrice]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
