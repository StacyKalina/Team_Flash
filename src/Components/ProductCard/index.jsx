import React from "react";
import styles from "./index.module.css";

const PLACEHOLDER_IMAGE =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='180' viewBox='0 0 260 180'><rect fill='%23f3f4f6' width='260' height='180'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%239aa3a8'>No image</text></svg>";

const defaultAddToCart = (payload) => {
    console.log("Mock add to cart", payload);
};

const defaultFooterClick = (payload) => {
    console.log("Mock navigate to product", payload);
};

export const ProductCard = ({
    id,
    title,
    price,
    imageSrc,
    oldPrice,
    discount,
    currencySymbol = "$",
    onAddToCart = defaultAddToCart,
    onFooterClick = defaultFooterClick,
}) => {
    const formatPrice = (value) =>
        typeof value === "number" ? value.toLocaleString("en-US") : value;

    const resolveDiscountLabel = () => {
        if (discount === undefined || discount === null || discount === 0) {
            return null;
        }
        if (typeof discount === "number") {
            const absolute = Math.abs(discount);
            const sign = discount > 0 ? "-" : "";
            return `${sign}${absolute}%`;
        }
        return discount;
    };

    const discountLabel = resolveDiscountLabel();
    const payload = {
        id,
        title,
        price,
        oldPrice,
        imageSrc: resolvedImageSrc,
        quantity: 1,
    };
    const resolvedImageSrc = imageSrc || PLACEHOLDER_IMAGE;

    const handleAddToCart = () => {
        onAddToCart(payload);
    };

    const handleFooterClick = () => {
        onFooterClick(payload);
    };

    const handleFooterKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleFooterClick();
        }
    };

    return (
        <article className={styles.card}>
            {discountLabel && <span className={styles.badge}>{discountLabel}</span>}
            <div className={styles.imageWrapper}>
                <img
                    className={styles.image}
                    src={resolvedImageSrc}
                    alt={title}
                    loading="lazy"
                />
                <button
                    type="button"
                    className={styles.ctaButton}
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>
            </div>
            <div
                className={styles.footer}
                role="button"
                tabIndex={0}
                onClick={handleFooterClick}
                onKeyDown={handleFooterKeyDown}
            >
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.priceRow}>
                    <span className={styles.price}>
                        {currencySymbol}
                        {formatPrice(price)}
                    </span>
                    {oldPrice && (
                        <span className={styles.oldPrice}>
                            {currencySymbol}
                            {formatPrice(oldPrice)}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
