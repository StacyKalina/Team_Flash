import React from "react";
import styles from './index.module.css'
import Button from "../MainButton";




export const MainBanner = () => {
    return (
        <div className={styles.BannerWrapper} >
            <div className={styles.BannerContent}>
                < h1 className={styles.MainHeader}>
                    Amazing Discounts on Garden Products!
                </h1>
                <Button text="Check out" onClick={() => alert('Go to shop!')} />
            </div>
        </div>
    );
};