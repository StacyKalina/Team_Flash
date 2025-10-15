import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../Components/ProductCard";
import styles from "./Catalog.module.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE ?? "http://localhost:3333";

const buildImageUrl = (relativePath) => {
    if (!relativePath) {
        return undefined;
    }
    if (/^https?:/i.test(relativePath)) {
        return relativePath;
    }
    const normalized = relativePath.replace(/^\/+/, "");
    return `${API_BASE_URL}/${normalized}`;
};

const mapProductToCard = (product) => {
    const hasDiscount =
        typeof product.discont_price === "number" &&
        product.discont_price > 0 &&
        product.discont_price < product.price;

    const currentPrice = hasDiscount ? product.discont_price : product.price;
    const oldPrice = hasDiscount ? product.price : undefined;

    const discountPercent = hasDiscount && product.price
        ? Math.round(((product.price - product.discont_price) / product.price) * 100)
        : null;

    return {
        id: product.id,
        title: product.title,
        price: currentPrice,
        oldPrice,
        discount: discountPercent,
        imageSrc: buildImageUrl(product.image),
    };
};

export const Catalog = () => {
    const { categoryId = "1" } = useParams();
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadCategoryProducts = async () => {
            setStatus("loading");
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();

                if (data.status === "ERR") {
                    throw new Error(data.message || "Category is empty");
                }

                if (!data || !Array.isArray(data.data)) {
                    throw new Error("Unexpected response format");
                }

                setProducts(data.data);
                setStatus("success");
            } catch (fetchError) {
                if (fetchError.name === "AbortError") {
                    return;
                }
                console.error("Failed to load category products", fetchError);
                setError(fetchError.message);
                setStatus("error");
            }
        };

        loadCategoryProducts();

        return () => {
            controller.abort();
        };
    }, [categoryId]);

    const cards = useMemo(() => products.map(mapProductToCard), [products]);

    return (
        <section className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Tools and equipment</h1>
            </header>

            {status === "loading" && (
                <p className={styles.stateMessage}>Loading category products...</p>
            )}

            {status === "error" && (
                <p className={styles.stateMessage}>
                    Could not load products for this category.
                    {error ? ` (${error})` : ""}
                </p>
            )}

            {status === "success" && cards.length === 0 && (
                <p className={styles.stateMessage}>No products found in this category.</p>
            )}

            {cards.length > 0 && (
                <div className={styles.cardsGrid}>
                    {cards.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </section>
    );
};
