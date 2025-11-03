import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import placeHolderImage from "../../Images/placeholder.svg"

import {
    fetchCategories,
    selectAllCategories,
    selectCategoriesStatus,
    selectCategoriesError,
} from "../../store/slices/categories";



const BASE_URL = "http://localhost:3333";


const buildImageUrl = (relativePath) => { //убираем у относительного пути слэши
    if (!relativePath) return undefined;
    if (/^https?:/i.test(relativePath)) return relativePath; // уже абсолютный URL
    const normalized = String(relativePath).replace(/^\/+/, ""); // убираем начальные /
    return `${BASE_URL}/${normalized}`;
};




//создаем компонент

export const CategoriesPage = () => {

    // Он ничего не знает о том, как устроен Redux внутри, подписывается на Redux-состояние (через useSelector) и отправляет экшены (через dispatch)

    const dispatch = useDispatch();

    const categories = useSelector(selectAllCategories);
    const status = useSelector(selectCategoriesStatus); // "idle" | "loading" | "succeeded" | "failed"
    const error = useSelector(selectCategoriesError);

    useEffect(() => {
        // грузим только когда «ещё ничего не делали»
        if (status !== "idle") return;
        dispatch(fetchCategories());
    }, [status, dispatch]);

    return (
        // два класс чтобы дополнить глобальный 
        // <div className={`sectionWrapper ${styles.wrapper} page__content` }>
        <section className="sectionWrapper">
            <div className="sectionShell">

                <h2 className="sectionTitle">Categories</h2>


                {status === "loading" && <p className={styles.infoMessage}> Loading Categories… </p>}

                {status === "failed" && (
                    <p className={styles.infoMessage}> Could not load categories. Ensure the backend on port 3333 is running
                        {error ? `(${error})` : ""}
                    </p>
                )}

                {status === "succeeded" && categories.length === 0 && (
                    <p className={styles.infoMessage}> No categories found yet. </p>
                )}


                {status === "succeeded" && categories.length > 0 && (
                    <div className={styles.cardsGrid}>
                        {categories.map((category) => {

                            const title = category.title ?? category.name ?? "Category";
                            const imageSrc = buildImageUrl(category.image) ?? placeHolderImage;

                            return (
                                // корневой элемент итерации, поэтому прописываем именно ему key
                                <div className={styles.imgWrapper} key={category.id}>
                                    <Link className={styles.categoryCard} to={`/categories/${category.id}`} >
                                        <div className={styles.thumbWrapper}>

                                            <img
                                                src={imageSrc}
                                                alt={title}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.src = placeHolderImage;
                                                }}
                                            />

                                        </div>
                                        <p className={styles.caption}>{title}</p>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )
                }
            </div>
        </section >
    )
}




