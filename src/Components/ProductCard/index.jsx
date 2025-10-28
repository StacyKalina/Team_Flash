import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import placeHolderImage from "../../Images/placeholder.svg";
import heartIcon from "../../Images/icons/heart.svg"; // Импортируем пустую иконку
import heartFilledIcon from "../../Images/icons/heart-filled.svg"; // Импортируем заполненную
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/slices/favoriteSlice";

const defaultAddToCart = (payload) => {
  console.log("Mock add to cart", payload);
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
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.items);
  const isFavorite = favoriteItems.some((item) => item.id === id);

  const formatPrice = (value) =>
    typeof value === "number" ? value.toLocaleString("en-US") : value;

  const resolveDiscountLabel = () => {
    if (discount === undefined || discount === null || discount === 0)
      return null;
    if (typeof discount === "number") {
      const absolute = Math.abs(discount);
      const sign = discount > 0 ? "-" : "";
      return `${sign}${absolute}%`;
    }
    return discount;
  };

  const discountLabel = resolveDiscountLabel();
  const payload = { id, title, price, imageSrc, oldPrice, discount };
  const resolvedImageSrc = imageSrc || placeHolderImage;

  const handleAddToCart = () => {
    onAddToCart(payload);
  };

  const handleToggleFavorite = (event) => {
    event.stopPropagation(); // Остановить всплытие, чтобы не сработал переход на страницу товара
    dispatch(toggleFavorite(payload));
  };

  const handleFooterClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <article className={styles.card}>
      {discountLabel && <span className={styles.badge}>{discountLabel}</span>}

      <button className={styles.favoriteButton} onClick={handleToggleFavorite}>
        <img
          src={isFavorite ? heartFilledIcon : heartIcon}
          alt="favorite icon"
        />
      </button>

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
