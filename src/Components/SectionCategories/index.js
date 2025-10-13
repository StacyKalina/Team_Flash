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


        const randomCategories = useMemo(() => getRandomFour(categories), [categories]);
        const BASE_URL = "http://localhost:3333";

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

                        {status === "succeeded" && (
                                <div className={styles.cardsGrid}>
                                        {randomCategories.map((category) => (
                                                <div className={styles.imgWrap}>
                                             
                                                        <Link
                                                                key={category.id}
                                                                to={`/categories/${category.id}`}
                                                                className={styles.categoryCard}
                                                        >
                                                                <img
                                                                        src={`${BASE_URL}${category.image}`}
                                                                        alt={category.title}
                                                                        loading="lazy"
                                                                />

                                                                <p className={styles.caption}>{category.title}</p>
                                                        </Link>
                                                </div>
                                        ))}
                                </div>
                        )}
                </div>
        );
};