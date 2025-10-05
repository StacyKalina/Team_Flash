import React from "react";
import styles from './index.module.css'
import discountBanner from '../../Images/discount-banner.png'
import { RegistrationForm } from "../RegistrationForm";

export const DiscountCard = () => {
    return (

        <div className={styles.DiscountBannerWrapper} >
            <div className={styles.DiscountBannerContent}>
                < h1 className={styles.DiscountHeader}>
                    5% off on the first order
                </h1>
            </div>
            <div className={styles.FormWrapper}>
                <div>
                 <img src={discountBanner} alt='discount banner' />
                </div>
                <div>
                    <RegistrationForm />
                </div>
            </div>
        </div>

    );
};