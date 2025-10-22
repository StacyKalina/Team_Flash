// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchProductById, selectedProduct } from "../../store/slices/productsSlice";
// import styles from "./index.module.css";

// export const ProductDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.products.selectedProduct);
//   const status = useSelector((state) => state.products.status);

//   const [count, setCount] = useState(1);

//   useEffect(() => {
//     dispatch(fetchProductById(id));
//   }, [dispatch, id]);

//   const handleIncrement = () => setCount((prev) => prev + 1);
//   const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

//   if (status === "loading") {
//     return <p>Loading product...</p>;
//   }

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   return (
//     <div className={styles.container}>
//       <img className={styles.image} src={product.image} alt={product.title} />
//       <div className={styles.info}>
//         <h1 className={styles.title}>{product.title}</h1>
//         <p className={styles.description}>{product.description}</p>
//         <p className={styles.price}>${product.price}</p>

//         <div className={styles.counter}>
//           <button onClick={handleDecrement}>-</button>
//           <span>{count}</span>
//           <button onClick={handleIncrement}>+</button>
//         </div>

//         <button className={styles.cartButton}>Добавить в корзину</button>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, selectSelectedProduct } from "../../store/slices/productsSlice";
import styles from "./index.module.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector((state) => state.products.status);

  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  if (status === "loading") return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={product.image} alt={product.title} />
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>

        <div className={styles.counter}>
          <button onClick={handleDecrement}>-</button>
          <span>{count}</span>
          <button onClick={handleIncrement}>+</button>
        </div>

        <button className={styles.cartButton}>Добавить в корзину</button>
      </div>
    </div>
  );
};
