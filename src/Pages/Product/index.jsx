import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    fetchProductById,
    selectProductDetails,
    selectProductDetailsStatus,
    selectProductDetailsError,
} from "../../store/slices/productDetailsSlice";

import { buildImageUrl, resolvePricing } from "../../store/selectors/productsHelper";
import styles from "./index.module.css";








export const ProductPage = () => {
    const { productId } = useParams();

    const dispatch = useDispatch();


    const product = useSelector(selectProductDetails);
    const status = useSelector(selectProductDetailsStatus);
    const error = useSelector(selectProductDetailsError);


    // локальний стейт кількості
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (productId) dispatch(fetchProductById(productId));
        // optional cleanup:
        // return () => dispatch(clearProductDetails());
    }, [dispatch, productId]);



    if (status === "loading") {
        return <div className={styles.state}>Loading...</div>;
    }
    if (status === "failed") {
        return <div className={styles.state}>Error: {error}</div>;
    }
    if (!product) {
        return <div className={styles.state}>Product not found.</div>;
    }


    const pricing = resolvePricing(product);
    const imageSrc = buildImageUrl(product.image);

    console.log({ productImage: product.image, imageSrc });   // проверить

    const handleAddToCart = () => {
        // тут підключиш свій cart-слайс/екшен
        // dispatch(addToCart({ id: product.id, qty, price: pricing.currentPrice, title: product.title }));
        console.log("Add to cart", { id: product.id, qty });
    };

    const formatPrice = (value) =>
        typeof value === "number" && Number.isFinite(value)
            ? value.toLocaleString("en-US")
            : "—";

    return (
        <section className={styles.wrapper}>
            <div className={styles.media}>
                <img className={styles.image} src={imageSrc} alt={product.title} />
            </div>

            <div className={styles.info}>
                <h1 className={styles.title}>{product.title}</h1>


                <div className={styles.priceRow}>
                    <span className={styles.price}>
                        ${formatPrice(pricing?.currentPrice)}
                    </span>

                    {pricing?.oldPrice && (
                        <span className={styles.oldPrice}>
                            ${formatPrice(pricing.oldPrice)}
                        </span>
                    )}

                    {pricing?.discountPercent ? (
                        <span className={styles.badge}>-{pricing.discountPercent}%</span>
                    ) : null}
                </div>


                <div className={styles.qtyRow}>
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className={styles.qtyBtn}>−</button>
                    <span className={styles.qty}>{qty}</span>
                    <button type="button" onClick={() => setQty((q) => q + 1)} className={styles.qtyBtn}>+</button>
                </div>

                <button type="button" className={styles.addBtn} onClick={handleAddToCart}>
                    Add to cart
                </button>

                <div className={styles.desc}>
                    <h2>Description</h2>
                    <p>{product.description || "No description provided."}</p>
                </div>
            </div>
        </section>
    );
}