import React from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../../Components/ProductCard";
import { FavoritesFiltersBar } from "../../Components/FavoritesFiltersBar/index.jsx"; // Импорт нового компонента
import { selectFilteredAndSortedFavorites } from "../../store/selectors/favoritesSelectors"; // Импорт нового селектора
import styles from "./index.module.css";

const Favorites = () => {
  const filteredFavorites = useSelector(selectFilteredAndSortedFavorites);

  return (
    <div className={styles.favoritesPage}>
      <h2>Liked Products</h2>

      <FavoritesFiltersBar />

      {filteredFavorites.length === 0 ? (
        <p>No products match your criteria. </p>
      ) : (
        <div className={styles.productsGrid}>
          {filteredFavorites.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
