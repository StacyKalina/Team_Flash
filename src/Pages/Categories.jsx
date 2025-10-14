import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";

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

const PLACEHOLDER_IMAGE =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect fill='%23ffffff' width='120' height='120' rx='12'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='14' fill='%239aa3a8'>No image</text></svg>";

export const Categories = () => {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadCategories = async () => {
            setStatus("loading");
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/categories/all`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format");
                }

                setItems(data);
                setStatus("success");
            } catch (fetchError) {
                if (fetchError.name === "AbortError") {
                    return;
                }
                console.error("Failed to load categories", fetchError);
                setError(fetchError.message);
                setStatus("error");
            }
        };

        loadCategories();

        return () => controller.abort();
    }, []);

    return (
        <section className={styles.wrapper}>
            <header>
                <h1 className="sectionTitle">Categories</h1>
            </header>

            {status === "loading" && (
                <p className={styles.stateMessage}>Loading categories...</p>
            )}

            {status === "error" && (
                <p className={styles.stateMessage}>
                    Could not load categories. Ensure the backend on port 3333 is running.
                    {error ? ` (${error})` : ""}
                </p>
            )}

            {status === "success" && items.length === 0 && (
                <p className={styles.stateMessage}>No categories found yet.</p>
            )}

            {items.length > 0 && (
                <div className={styles.grid}>
                    {items.map((category) => {
                        const imageSrc = buildImageUrl(category.image) ?? PLACEHOLDER_IMAGE;
                        return (
                            <Link
                                key={category.id}
                                to={`/categories/${category.id}`}
                                className={styles.categoryCard}
                            >
                                <img
                                    className={styles.thumbnail}
                                    src={imageSrc}
                                    alt={category.title}
                                    loading="lazy"
                                />
                                <span className={styles.categoryTitle}>{category.title}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
