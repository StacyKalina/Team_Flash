import React from "react";
import styles from "./index.module.css";
import instagramIcon from "../../Images/icons/Insta.svg";
import whatsappIcon from "../../Images/icons/ic-whatsapp.svg";
import mapImage from "../../Images/map.png";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h2 className={styles.title}>Contact</h2>

            <div className={styles.cards}>
                <div className={styles.infoRow}>
                    <div className={`${styles.card} ${styles.cardWide}`}>
                        <span className={styles.cardLabel}>Phone</span>
                        <a className={styles.cardValue} href="tel:+499999999999">
                            +49 999 999 99 99
                        </a>
                    </div>

                    <div className={`${styles.card} ${styles.cardNarrow}`}>
                        <span className={styles.cardLabel}>Socials</span>
                        <div className={styles.socials}>
                            <a
                                className={styles.socialButton}
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <img src={instagramIcon} alt="Instagram" />
                            </a>
                            <a
                                className={styles.socialButton}
                                href="https://wa.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <img src={whatsappIcon} alt="WhatsApp" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.infoRow}>
                    <div className={`${styles.card} ${styles.cardWide}`}>
                        <span className={styles.cardLabel}>Address</span>
                        <address className={`${styles.cardValue} ${styles.address}`}>
                            Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
                        </address>
                    </div>

                    <div className={`${styles.card} ${styles.cardNarrow}`}>
                        <span className={styles.cardLabel}>Working Hours</span>
                        <span className={styles.cardValue}>24 hours a day</span>
                    </div>
                </div>
            </div>

            <div className={styles.mapWrapper}>
                <img src={mapImage} alt="Location map" />
            </div>
        </footer>
    );
};

export default Footer;

