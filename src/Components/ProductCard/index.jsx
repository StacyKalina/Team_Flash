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
 * - Передаёт cameFrom в navigate для корректных хлебных крошек.
 * - Избранное через Redux (toggleFavorite).
 * - Добавление в корзину — через onAddToCart (можно заменить в родителе).
 */

const defaultAddToCart = (payload) => {
  console.log("Mock add to cart", payload);
};

export const ProductCard = ({
  id,
  title,
  // Базовая цена (без скидки)
  price,
  // Картинка, которую мог отдать бэкенд/селектор
  imageSrc,
  // Поле для «старой» цены (для зачёркнутого значения в UI)
  oldPrice,
  // Процент скидки или метка; может быть числом (например, 15) или строкой («-15%»)
  discount,
  // Если бэкенд отдаёт готовую скидочную цену — берём её
  discont_price,
  currencySymbol = "$",
  onAddToCart = defaultAddToCart,
  cameFrom, // контекст для крошек: { type: "category"|"all"|"sales"|..., id? }
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // === Избранное ===
  // NB: в сторах это обычно 'favorites'; если у тебя другой ключ редьюсера — поправь здесь.
  const favoriteItems = useSelector((s) => s.favorites?.items || []);
  const isFavorite = favoriteItems.some((item) => item.id === id);

  // Формат цены вывода в карточке
  const formatPrice = (value) =>
    typeof value === "number" ? value.toLocaleString("en-US") : value;

  // Текст бейджа скидки
  const resolveDiscountLabel = () => {
    if (discount === undefined || discount === null || discount === 0) return null;
    if (typeof discount === "number") {
      const abs = Math.abs(discount);
      const sign = discount > 0 ? "-" : "";
      return `${sign}${abs}%`;
    }
    return discount; // уже готовая строка
  };
  const discountLabel = resolveDiscountLabel();

  // Разрешаем картинку, чтобы и в корзине/избранном не было пусто
  const resolvedImageSrc = imageSrc || placeHolderImage;

  // === Пэйлоады ===
  // Корзина должна знать обе цены: price (базовая) и discont_price (если была).
  // totalPrice в cartSlice будет считать по (discont_price ?? price) — см. ниже.
  const cartPayload = {
    id,
    title,
    price,                         // базовая цена (без скидки)
    oldPrice: oldPrice ?? null,    // для вывода зачёркнутого значения
    discount: discount ?? null,    // просто как справочная инфа (необязательно, но полезно)
    discont_price: (typeof discont_price === "number" ? discont_price : null),
    imageSrc: resolvedImageSrc,    // кладём уже «готовый» src
    quantity: 1,                   // явно кладём 1; в слайсе есть ensureQuantity, но так читабельнее
  };

  // Для избранного тоже храним готовую картинку и все полезные поля
  const favoritePayload = {
    id,
    title,
    price,
    oldPrice: oldPrice ?? null,
    discount: discount ?? null,
    discont_price: (typeof discont_price === "number" ? discont_price : null),
    imageSrc: resolvedImageSrc,
  };

  // === Действия ===
  const handleAddToCart = () => onAddToCart(cartPayload);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // чтобы клик не открыл карточку товара
    dispatch(toggleFavorite(favoritePayload));
  };

  // Переход на страницу товара + важный state для крошек
  const handleOpenProduct = () => {
    navigate(`/product/${id}`, { state: { cameFrom } });
  };

  // === Рендер ===
  return (
    <article className={styles.card}>
      {discountLabel && <span className={styles.badge}>{discountLabel}</span>}

      <button
        type="button"
        className={styles.favoriteButton}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <img src={isFavorite ? heartFilledIcon : heartIcon} alt="" />
      </button>

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

      <button
        type="button"
        className={styles.footer}
        onClick={handleOpenProduct}
      >
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>
            {currencySymbol}
            {formatPrice(typeof discont_price === "number" ? discont_price : price)}
          </span>

          {/* показываем oldPrice, если он есть (UI — зачёркнуто) */}
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
