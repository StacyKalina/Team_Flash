/**
 * 💡 Всё, что связано с "ценой", теперь считается здесь.
 * Компоненты (SectionSales, ProductCard и т.д.) не дублируют логику.
 */

export const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

// === ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ===============================================
/**
 * buildImageUrl(relativePath)
 * Преобразует относительный путь (например, "images/product.jpg")
 * в абсолютный URL, понятный браузеру.
 * - Если пришёл абсолютный URL (http/https/data:), возвращает как есть.
 * - Убирает ./ и ../ в начале.
 * - Заменяет обратные слэши на прямые.
 * - Убирает двойные или ведущие слэши.
 */
export const buildImageUrl = (relativePath) => {
  if (!relativePath) return undefined;

  // Абсолютные URL (http/https//cdn) или data: — возвращаем как есть
  if (/^(?:[a-z]+:)?\/\//i.test(relativePath) || /^data:/i.test(relativePath)) {
    return relativePath;
  }

  // Приводим к нормальному виду:
  let p = String(relativePath)
    .replace(/^\.\/+/, "")   // убираем ./ в начале
    .replace(/^\.\.\/+/, "") // убираем ../ в начале
    .replace(/\\/g, "/")     // заменяем обратные слэши
    .replace(/^\/+/, "");    // убираем ведущие /

  return `${API_BASE_URL}/${p}`;
};

// === ЦЕНОВАЯ ЛОГИКА ==========================================================
/**
 * resolvePricing(product)
 * Определяет, есть ли скидка и считает:
 * - currentPrice — цена, которая должна отображаться в UI;
 * - oldPrice — зачёркнутая (если есть скидка);
 * - discountPercent — числовое значение процента скидки;
 * - hasDiscount — логический флаг.
 * Возвращает объект, с которым удобно дальше работать в mapProductToCard.
 */
export const resolvePricing = (product) => {
  const price = product.price;
  const discountPrice = product.discont_price;

  const hasDiscount =
    typeof discountPrice === "number" &&
    discountPrice > 0 &&
    typeof price === "number" &&
    discountPrice < price;

  const currentPrice = hasDiscount ? discountPrice : price;
  const oldPrice = hasDiscount ? price : undefined;

  const discountPercent =
    hasDiscount && price
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  return {
    price,             // базовая цена (из бэка)
    discont_price: hasDiscount ? discountPrice : undefined, // скидочная
    currentPrice,      // что показывать в UI
    oldPrice,          // зачёркнутая, если есть
    discountPercent,   // целое число (например, 15)
    hasDiscount,       // флаг для логики
  };
};

// === КАРТОЧКА ПРОДУКТА =======================================================
/**
 * mapProductToCard(product)
 * Подготавливает данные в формате, который ждёт <ProductCard />.
 * 
 * Возвращает объект с полями:
 * - id, title, description
 * - price (базовая), discont_price (скидочная)
 * - oldPrice, discount
 * - imageSrc — всегда абсолютный путь к картинке
 */
export const mapProductToCard = (product, pricing = resolvePricing(product)) => ({
  id: product.id,
  title: product.title,

  // Две цены — чтобы карточка и корзина имели полную информацию
  price: pricing.price,                 // базовая
  discont_price: pricing.discont_price, // скидочная (если есть)

  oldPrice: pricing.oldPrice,           // зачёркнутая (если есть)
  discount: pricing.discountPercent,    // число (например, 15 → "-15%")

  // Безопасно собираем путь к изображению
  imageSrc: product.image ? buildImageUrl(product.image) : undefined,

  description: product.description, // добавлено для ProductDetail
});
