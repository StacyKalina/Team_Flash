import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";
import placeHolderImage from "../../Images/placeholder.svg";
import heartIcon from "../../Images/icons/heart.svg";
import heartFilledIcon from "../../Images/icons/heart-filled.svg";
import { toggleFavorite } from "../../store/slices/favoriteSlice";

/**
 * ProductCard
 * ------------
 * - Переход на страницу товара передаёт state: { cameFrom } — важно для хлебных крошек.
 * - Избранное: локальная кнопка с Redux (toggleFavorite).
 * - Добавление в корзину — через onAddToCart (можно заменить в родителе).
 */

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
  cameFrom, // контекст для крошек (Catalog/AllProducts/Sales/Favorites и т.п.)
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Избранное
  const favoriteItems = useSelector((s) => s.favorites?.items || []);
  const isFavorite = favoriteItems.some((item) => item.id === id);

  // Формат цены
  const formatPrice = (value) =>
    typeof value === "number" ? value.toLocaleString("en-US") : value;

  // Бейдж скидки
  const resolveDiscountLabel = () => {
    if (discount === undefined || discount === null || discount === 0) return null;
    if (typeof discount === "number") {
      const abs = Math.abs(discount);
      const sign = discount > 0 ? "-" : "";
      return `${sign}${abs}%`;
    }
    return discount;
  };
  const discountLabel = resolveDiscountLabel();

  // Картинка
  const resolvedImageSrc = imageSrc || placeHolderImage;

  // Пэйлоады
  const cartPayload = {
    id,
    title,
    price,
    oldPrice,
    imageSrc: resolvedImageSrc,
    quantity: 1,
  };
  const favoritePayload = { id, title, price, imageSrc, oldPrice, discount };

  // Действия
  const handleAddToCart = () => onAddToCart(cartPayload);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // чтобы не сработал переход на товар
    dispatch(toggleFavorite(favoritePayload));
  };

  // Переход на страницу товара + важный state для крошек
  const handleOpenProduct = () => {
    navigate(`/product/${id}`, { state: { cameFrom } });
  };

  return (
    <article className={styles.card}>
      {/* Бейдж скидки (если есть) */}
      {discountLabel && <span className={styles.badge}>{discountLabel}</span>}

      {/* Кнопка избранного (в верхнем углу карточки) */}
      <button
        type="button"
        className={styles.favoriteButton}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <img src={isFavorite ? heartFilledIcon : heartIcon} alt="" />
      </button>

      {/* Изображение + CTA */}
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={resolvedImageSrc}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = placeHolderImage;
          }}
        />
        <button
          type="button"
          className={styles.ctaButton}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>

      {/* Футер карточки: по клику — переход на страницу товара */}
      <button
        type="button"
        className={styles.footer}
        onClick={handleOpenProduct}
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
      </button>
    </article>
  );
};

