import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import closeIcon from "../../Images/icons/ic-x.svg";
export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {return null;}


    return ReactDOM.createPortal(
        <>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>{children}</div>
                <div className={styles.iconWrapper}>
                  <img src={closeIcon} alt="Close" onClick={onClose} /> 
                </div>
            </div>

        </>,
        document.body
    );
};