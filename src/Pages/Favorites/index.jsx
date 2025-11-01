import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../../Components/ProductCard";
import { FavoritesFiltersBar } from "../../Components/FavoritesFiltersBar/index.jsx"; // �~ѬѨ��?�' ѫ���������� ѧ��ѬѨ��ѫ��ѫ�'��
import { selectFilteredAndSortedFavorites } from "../../store/selectors/favoritesSelectors"; // �~ѬѨ��?�' ѫ���������� �?��ѯ��ѧ�'��?��
import { addItem } from "../../store/slices/cartSlice";
import styles from "./index.module.css";

const Favorites = () => {
  const filteredFavorites = useSelector(selectFilteredAndSortedFavorites);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className={styles.favoritesPage}>
      <h2>Liked Products</h2>

      <FavoritesFiltersBar />

      {filteredFavorites.length === 0 ? (
        <p>No products match your criteria. </p>
      ) : (
        <div className={styles.productsGrid}>
          {filteredFavorites.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
