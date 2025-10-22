import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../Components/ProductCard";
import { useCart } from "../../context/CartContext";
import styles from "./Catalog.module.css";
import sortIcon from "../../Images/icons/Vector.svg";

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

const resolvePricing = (product) => {
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
        currentPrice,
        oldPrice,
        discountPercent,
        hasDiscount,
    };
};

const mapProductToCard = (product, pricing = resolvePricing(product)) => {
    const { currentPrice, oldPrice, discountPercent, hasDiscount } = pricing;

    return {
        id: product.id,
        title: product.title,
        price: currentPrice,
        oldPrice: hasDiscount ? oldPrice : undefined,
        discount: discountPercent,
        imageSrc: buildImageUrl(product.image),
    };
};

const SORT_OPTIONS = [
    { value: "default", label: "by default" },
    { value: "priceAsc", label: "price: low to high" },
    { value: "priceDesc", label: "price: high to low" },
    { value: "discountDesc", label: "discount" },
];

export const Catalog = () => {
    const { categoryId = "1" } = useParams();
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const { addItem } = useCart();
    const [filters, setFilters] = useState({
        priceFrom: "",
        priceTo: "",
        discountOnly: false,
        sortOrder: "default",
    });

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

    const filteredCards = useMemo(() => {
        if (!Array.isArray(products)) {
            return [];
        }

        const priceFrom = Number.parseFloat(filters.priceFrom);
        const priceTo = Number.parseFloat(filters.priceTo);
        const discountOnly = Boolean(filters.discountOnly);
        const sortOrder = filters.sortOrder;

        const enriched = products.map((product) => ({
            product,
            pricing: resolvePricing(product),
        }));

        const filtered = enriched.filter(({ pricing }) => {
            const { currentPrice, hasDiscount } = pricing;

            if (!Number.isNaN(priceFrom) && currentPrice < priceFrom) {
                return false;
            }

            if (!Number.isNaN(priceTo) && currentPrice > priceTo) {
                return false;
            }

            if (discountOnly && !hasDiscount) {
                return false;
            }

            return true;
        });

        let sorted = filtered;

        if (sortOrder !== "default") {
            sorted = [...filtered];

            switch (sortOrder) {
                case "priceAsc":
                    sorted.sort(
                        (a, b) => a.pricing.currentPrice - b.pricing.currentPrice
                    );
                    break;
                case "priceDesc":
                    sorted.sort(
                        (a, b) => b.pricing.currentPrice - a.pricing.currentPrice
                    );
                    break;
                case "discountDesc":
                    sorted.sort(
                        (a, b) =>
                            (b.pricing.discountPercent ?? 0) -
                            (a.pricing.discountPercent ?? 0)
                    );
                    break;
                default:
                    break;
            }
        }

        return sorted.map(({ product, pricing }) => mapProductToCard(product, pricing));
    }, [filters, products]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const preventSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <section className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>Tools and equipment</h1>
            </header>

            <form className={styles.filtersBar} onSubmit={preventSubmit}>
                <div className={styles.filterSection}>
                    <span className={styles.filterLabel}>Price</span>
                    <div className={styles.priceInputs}>
                        <input
                            type="number"
                            min="0"
                            name="priceFrom"
                            placeholder="from"
                            value={filters.priceFrom}
                            onChange={handleInputChange}
                            className={styles.priceInput}
                        />
                        <input
                            type="number"
                            min="0"
                            name="priceTo"
                            placeholder="to"
                            value={filters.priceTo}
                            onChange={handleInputChange}
                            className={styles.priceInput}
                        />
                    </div>
                </div>

                <label className={styles.discountToggle}>
                    <span className={styles.filterLabel}>Discounted items</span>
                    <input
                        type="checkbox"
                        name="discountOnly"
                        checked={filters.discountOnly}
                        onChange={handleCheckboxChange}
                        className={styles.discountCheckbox}
                    />
                </label>

                <div className={styles.filterSection}>
                    <span className={styles.filterLabel}>Sorted</span>
                    <div className={styles.sortControl}>
                        <select
                            name="sortOrder"
                            value={filters.sortOrder}
                            onChange={handleInputChange}
                            className={styles.sortSelect}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <img
                            src={sortIcon}
                            alt=""
                            aria-hidden="true"
                            className={styles.sortIcon}
                        />
                    </div>
                </div>
            </form>

            {status === "loading" && (
                <p className={styles.stateMessage}>Loading category products...</p>
            )}

            {status === "error" && (
                <p className={styles.stateMessage}>
                    Could not load products for this category.
                    {error ? ` (${error})` : ""}
                </p>
            )}

            {status === "success" && filteredCards.length === 0 && (
                <p className={styles.stateMessage}>No products found in this category.</p>
            )}

            {filteredCards.length > 0 && (
                <div className={styles.cardsGrid}>
                    {filteredCards.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            onAddToCart={addItem}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
