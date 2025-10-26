import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import placeHolderImage from "../../Images/placeholder.svg";

/**
 * ProductCard
 * ------------
 * Небольшая карточка товара:
 * - Показывает картинку, название, цену и (опц.) старую цену / бейдж скидки
 * - Позволяет добавить товар в корзину
 * - По клику на "футер" ведёт на страницу товара
 *
 * ВАЖНО: мы аккуратно передаём в navigate() объект state с "cameFrom",
 * чтобы страница товара могла правильно построить хлебные крошки.
 * Никаких угадываний по URL — всё явно через пропсы.
 */

const defaultAddToCart = (payload) => {
  // Заглушка на случай, если обработчик не передали
  // Можно заменить на dispatch(addToCart(payload)) в родителе
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
  cameFrom, // ← контекст для крошек (передаёт родитель, напр. Catalog/AllProducts/Sales)
}) => {
  const navigate = useNavigate();

  // Аккуратное форматирование цены с разделителями
  const formatPrice = (value) =>
    typeof value === "number" ? value.toLocaleString("en-US") : value;

  // Преобразуем скидку к виду "-15%" (если число) или показываем как есть (если строка)
  const resolveDiscountLabel = () => {
    if (discount === undefined || discount === null || discount === 0) return null;
    if (typeof discount === "number") {
      const absolute = Math.abs(discount);
      const sign = discount > 0 ? "-" : "";
      return `${sign}${absolute}%`;
    }
    return discount;
  };

  const discountLabel = resolveDiscountLabel();

  // Запасная картинка
  const resolvedImageSrc = imageSrc || placeHolderImage;

  // Набор данных, которые передадим в корзину
  const cartPayload = { id, title, price };

  // Добавить в корзину (обработчик можно переопределить пропсом сверху)
  const handleAddToCart = () => {
    onAddToCart(cartPayload);
  };

  // Переход на страницу товара
  // ВАЖНО: всегда передаём state с cameFrom, НО без «угадываний» — просто то, что пришло пропсом
  const handleOpenProduct = () => {
    navigate(`/product/${id}`, { state: { cameFrom } });
  };

  return (
    <article className={styles.card}>
      {/* Бейдж скидки (если есть) */}
      {discountLabel && <span className={styles.badge}>{discountLabel}</span>}

      {/* Блок изображения + CTA */}
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

      {/* Футер карточки: название + цены. По клику — переход на страницу товара */}
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
