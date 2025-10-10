import React from "react";
import styles from './index.module.css'
import { RegistrationForm } from "../RegistrationForm";

export const DiscountCard = () => {
    return (

        <div className={styles.discountBannerWrapper} >
            <div className={styles.discountBannerContent}>
                < h1 className={styles.discountHeader}>
                    5% off on the first order
                </h1>
                <div className={styles.formWrapper}>
                    <RegistrationForm />
                </div>
            </div>
        </div>

    );
};