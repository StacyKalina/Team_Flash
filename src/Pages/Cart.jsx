import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(value);

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
    const linePrice = item.price * item.quantity;
    const lineOldPrice =
        typeof item.oldPrice === "number"
            ? item.oldPrice * item.quantity
            : undefined;
    const isDecreaseDisabled = item.quantity <= 1;

    return (
        <article className={styles.cartItem}>
            <div className={styles.itemImageWrapper}>
                {item.imageSrc ? (
                    <img
                        src={item.imageSrc}
                        alt={item.title}
                        className={styles.itemImage}
                    />
                ) : (
                    <div className={styles.itemImageFallback} aria-hidden="true">
                        {item.title ? item.title.charAt(0).toUpperCase() : ""}
                    </div>
                )}
            </div>

            <div className={styles.itemBody}>
                <div className={styles.itemHeader}>
                    <h2 className={styles.itemTitle}>{item.title}</h2>
                    <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                    >
                        &times;
                    </button>
                </div>

                <div className={styles.itemFooter}>
                    <div
                        className={styles.quantityControl}
                        role="group"
                        aria-label={`Change quantity for ${item.title}`}
                    >
                        <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => onDecrement(item.id)}
                            disabled={isDecreaseDisabled}
                            aria-label={`Decrease quantity of ${item.title}`}
                        >
                            -
                        </button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={() => onIncrement(item.id)}
                            aria-label={`Increase quantity of ${item.title}`}
                        >
                            +
                        </button>
                    </div>

                    <div className={styles.priceBlock}>
                        <span className={styles.currentPrice}>
                            {formatCurrency(linePrice)}
                        </span>
                        {lineOldPrice ? (
                            <span className={styles.oldPrice}>
                                {formatCurrency(lineOldPrice)}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
        </article>
    );
};

export const Cart = () => {
    const { items, incrementItem, decrementItem, removeItem } = useCart();

    const hasItems = items.length > 0;

    return (
        <section className={styles.cartPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Shopping cart</h1>
                <Link to="/" className={styles.backLink}>
                    Back to the store
                </Link>
            </header>

            <div className={styles.content}>
                <div className={styles.itemsColumn}>
                    {hasItems ? (
                        items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrement={incrementItem}
                                onDecrement={decrementItem}
                                onRemove={removeItem}
                            />
                        ))
                    ) : (
                        <p className={styles.emptyState}>Your cart is empty.</p>
                    )}
                </div>
                <aside className={styles.summaryColumn}>
                    <div className={styles.summaryPlaceholder}>
                        Order details will appear here soon.
                    </div>
                </aside>
            </div>
        </section>
    );
};
