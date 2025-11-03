import React from "react";
import styles from './index.module.css'
import { RegistrationForm } from "../RegistrationForm";

export const DiscountCard = () => {
    return (
        <section className="sectionShell">
            <div className={styles.banner}>
                <h1 className={styles.title}>5% off on the first order</h1>
                <div className={styles.inner}>
                    <div className={styles.visual} aria-hidden="true" />
                    <div className={styles.formCol}>
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </section>

    );
};