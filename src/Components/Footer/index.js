import { FooterContact } from "./footerContact";
import { contact } from "../../data/contact";
import styles from "./index.module.css";



export const Footer = () => {
    return (
    <footer className = {styles.footer}>
        <FooterContact contact = {contact}/>

    </footer>
    )
}
