const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

export const buildImageUrl = (relativePath) => {
  if (!relativePath) return undefined;
  // абсолютные URL (http/https//cdn) или data: — возвращаем как есть
  if (/^(?:[a-z]+:)?\/\//i.test(relativePath) || /^data:/i.test(relativePath)) {
    return relativePath;
  }

  // приводим к нормальному виду:
  // 1) строка
  let p = String(relativePath);

  // 2) убираем ./ и ../ в начале (backend иногда так даёт)
  p = p.replace(/^\.\/+/, "").replace(/^\.\.\/+/, "");

  // 3) заменяем обратные слэши на прямые
  p = p.replace(/\\/g, "/");

  // 4) убираем ведущие слэши (чтобы не получить // при склейке)
  p = p.replace(/^\/+/, "");

  return `${API_BASE_URL}/${p}`;
};

export const resolvePricing = (product) => {
  const hasDiscount =
    typeof product.discont_price === "number" &&
    product.discont_price > 0 &&
    product.discont_price < product.price;

  const currentPrice = hasDiscount ? product.discont_price : product.price;
  const oldPrice = hasDiscount ? product.price : undefined;

  const discountPercent = hasDiscount && product.price
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : null;

  return { currentPrice, oldPrice, discountPercent, hasDiscount };
};

export const mapProductToCard = (product, pricing = resolvePricing(product)) => ({
  id: product.id,
  title: product.title,
  price: pricing.currentPrice,
  oldPrice: pricing.hasDiscount ? pricing.oldPrice : undefined,
  discount: pricing.discountPercent,
  imageSrc: product.image ? buildImageUrl(product.image) : undefined,
  description: product.description, // додали
});