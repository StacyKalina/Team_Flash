import { FooterContact } from "./footerContact";
import { contact } from "../../data/contact";
import { FooterMap } from "./footerMap"
import styles from "./index.module.css";



export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`page__content ${styles.footerInner}`}>
                <FooterContact contact={contact} />
                <FooterMap />
            </div>
        </footer>
    )
}
