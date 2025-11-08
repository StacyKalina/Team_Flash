import styles from "./index.module.css";

/**
 * Полная копия структуры ProductCard:
 * .card → .imageWrapper → .image
 * .footer → .title + .priceRow (.price + .oldPrice)
 * Внутри — пустые блоки с styles.skeletonBox.
 */
export const ProductCardSkeleton = () => {
  return (
    <article className={`${styles.card} ${styles.skeletonCard}`} data-skeleton="true" aria-hidden="true">
      {/* Бейдж и избранное в скелет не выводим (или делаем пустыми при желании) */}

      <div className={styles.imageWrapper}>
        <div className={`${styles.image} ${styles.skeletonBox}`} />
        {/* Кнопку CTA не показываем, чтобы не мигала при наведении */}
      </div>

      <div className={styles.footer}>
        <div className={`${styles.title} ${styles.skeletonBox}`} />
        <div className={styles.priceRow}>
          <div className={`${styles.price} ${styles.skeletonBox}`} />
          <div className={`${styles.oldPrice} ${styles.skeletonBox}`} />
        </div>
      </div>
    </article>
  );
};
