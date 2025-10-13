import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

import {
    fetchCategories,
    selectAllCategories,
    selectCategoriesStatus,
    selectCategoriesError,
} from "../../store/slices/categories";


//создаем компонент

export const CategoriesPage = () => {

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

    return (
        <div className="page">
            <h2 className="sectionTitle"> Categories </h2>


            {status === "loading" && <p>Loading…</p>}

            {status === "failed" && (
                <p style={{ color: "crimson" }}>{error ?? "Something went wrong!"}</p>
            )}

            {status === "succeeded" && (
                <div className={styles.cardsGrid}>
                    {categories.map((category) => (
                        // корневой элемент итерации, поэтому прописываем именно ему key
                        <div key={category.id} className={styles.imgWrap}>

                            <Link className={styles.categoryCard} to={`/categories/${category.id}`}>
                                <div className={styles.thumbWrap}>
                                    <img
                                        src={`${BASE_URL}${category.image}`}
                                        alt={category.title ?? category.name ?? "Category"}
                                        loading="lazy"
                                    />
                                </div>
                                <p className={styles.caption}>
                                    {category.title ?? category.name ?? "Other"}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;