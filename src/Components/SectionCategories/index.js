import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { SectionHeader } from "../SectionHeader";
import styles from "./index.module.css";

import {
        fetchCategories,
        selectAllCategories,
        selectCategoriesStatus,
        selectCategoriesError,
} from "../../store/slices/categories";

import placeHolderImage from "../../Images/placeholder.svg"






// рендомная выборка 4 элементов - алгоритм Фишера–Йетса
function getRandomFour(arr) {
        if (!Array.isArray(arr)) return [];

        const copyArr = [...arr];

        for (let i = copyArr.length - 1; i > 0; i--) {
                const newIndex = Math.floor(Math.random() * (i + 1));
                [copyArr[i], copyArr[newIndex]] = [copyArr[newIndex], copyArr[i]];

        }
        return copyArr.slice(0, 4);
}

//создаем компонент

export const SectionCategories = () => {

        // Она ничего не знает о том, как устроен Redux внутри, он подписывается на Redux-состояние (через useSelector)
        // и отправляет экшены (через dispatch)

        const dispatch = useDispatch();

        const categories = useSelector(selectAllCategories);
        const status = useSelector(selectCategoriesStatus);
        const error = useSelector(selectCategoriesError);


        useEffect(() => {
                if (status === "idle") {
                        dispatch(fetchCategories());
                }
        }, [status, dispatch]);


        const BASE_URL = "http://localhost:3333";

        const randomCategories = useMemo(() => getRandomFour(categories), [categories]);

        const buildImageUrl = (relativePath) => { //убираем у относительного пути слэши
                if (!relativePath) return undefined;
                if (/^https?:/i.test(relativePath)) return relativePath; // уже абсолютный URL
                const normalized = String(relativePath).replace(/^\/+/, ""); // убираем начальные /
                return `${BASE_URL}/${normalized}`;
        };


        return (
                <div className="sectionWrapper">
                        <SectionHeader
                                title="Categories"
                                buttonText="Alle Kategorien"
                                fromRouterPath="/categories"
                        />

                        {status === "loading" && <p>Loading…</p>}

                        {status === "failed" && (
                                <p style={{ color: "crimson" }}>{error ?? "Etwas ist schiefgelaufen"}</p>
                        )}

                        {status === "succeeded" && categories.length === 0 && (
                                <p className={styles.infoMessage}> No categories found yet. </p>
                        )}

                        {status === "succeeded" && (
                                <div className={styles.cardsGrid}>
                                        {randomCategories.map((category) => {

                                                const title = category.title ?? category.name ?? "Category";
                                                const imageSrc = buildImageUrl(category.image) ?? placeHolderImage;

                                                return (
                                                        // корневой элемент итерации, поэтому прописываем именно ему key
                                                        <div className={styles.imgWrapper} key={category.id}>
                                                                <Link className={styles.categoryCard}
                                                                        to={`/categories/${category.id}`} >

                                                                        <div className={styles.thumbWrapper}>
                                                                                <img
                                                                                        src={imageSrc}
                                                                                        alt={title}
                                                                                        loading="lazy"
                                                                                />
                                                                        </div>
                                                                        <p className={styles.caption}>{category.title}</p>

                                                                </Link>
                                                        </div>

                                                )
                                        })}
                                </div>
                        )
                        }
                </div>
        );
};