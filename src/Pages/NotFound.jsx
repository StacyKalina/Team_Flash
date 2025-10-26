import React from "react";
import styles from './NotFound.module.css';
import Button from "../Components/MainButton";
import { Link, NavLink } from 'react-router-dom'

export const NotFound = () => {
    return (
        <nav>
            <div className={styles.notFoundPageContent}>
                <div className={styles.notFoundImgContent} />
                <div className={styles.notFoundTextContent} />


                <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}                >
                    <Button text="Go Home"/>
                </NavLink>
            </div>
        </nav>

    )
}