import React from "react";
import styles from "./index.module.css";
import FooterContact from "./footerContact";
import FooterMap from "./footerMap";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h2 className={styles.title}>Contact</h2>
            <FooterContact />
            <FooterMap />
        </footer>
    );
};

export default Footer;
