import React from "react";
import styles from './index.module.css'
import Button from "../MainButton";
import { Link, NavLink } from 'react-router-dom'






export const MainBanner = () => {
    return (
        <nav>
            <div className={styles.BannerWrapper} >
                <div className={styles.BannerContent}>
                    < h1 className={styles.MainHeader}>
                        Amazing Discounts on Garden Products!
                    </h1>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : ""}                >
                        <Button text="Check out" />
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};