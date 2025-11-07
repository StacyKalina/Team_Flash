import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  selectSelectedProduct,
} from "../../store/slices/productsSlice";
import { addItem } from "../../store/slices/cartSlice";
import styles from "./index.module.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";
const DESCRIPTION_LIMIT = 150;

export const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const status = useSelector((state) => state.products.status);
  const [count, setCount] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false); 

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const toggleDescription = () => setShowFullDescription((prev) => !prev); 
  const handleAddToCart = () => {
    if (!product) return;

    const price = product.discont_price ?? product.price;
    const oldPrice = product.discont_price ? product.price : null;
    const imageSrc = `${API_BASE_URL}${product.image}`;

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price,
        oldPrice,
        imageSrc,
        quantity: count,
      })
    );
  };

  if (status === "loading") return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  const imageUrl = `${API_BASE_URL}${product.image}`;
  const needsReadMore =
    product.description.length > DESCRIPTION_LIMIT; // Show toggle when description exceeds limit

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} alt={product.title} />
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.priceAndActions}>
          {/* Pricing block with optional discount badge */}
          <div className={styles.priceContainer}>
            {product.discont_price ? (
              <span className={styles.discountPrice}>
                ${product.discont_price}
              </span>
            ) : (
              <span className={styles.price}>${product.price}</span>
            )}
            {product.discont_price && (
              <span className={styles.oldPrice}>${product.price}</span>
            )}
            {product.discont_price && (
              <span className={styles.discountPercentage}>
                -
                {Math.round(
                  ((product.price - product.discont_price) / product.price) *
                    100
                )}
                %
              </span>
            )}
          </div>
          <div className={styles.counterAndCart}>
            <div className={styles.counter}>
              <button className={styles.counterBtn} onClick={handleDecrement}>
                -
              </button>
              <div className={styles.counterBox}>{count}</div>
              <button className={styles.counterBtn} onClick={handleIncrement}>
                +
              </button>
            </div>
            <button className={styles.cartButton} onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
        <h4>Description</h4>
        <p className={styles.description}>
          {showFullDescription || !needsReadMore
            ? product.description
            : `${product.description.slice(0, DESCRIPTION_LIMIT)}...`}
        </p>
        {needsReadMore && (
          <button onClick={toggleDescription} className={styles.readMoreBtn}>
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};

