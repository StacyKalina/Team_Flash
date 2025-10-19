const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

export const buildImageUrl = (relativePath) => {
  if (!relativePath) return undefined;
  if (/^https?:/i.test(relativePath)) return relativePath;
  return `${API_BASE_URL}/${relativePath.replace(/^\/+/, "")}`;
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
  imageSrc: buildImageUrl(product.image),
});