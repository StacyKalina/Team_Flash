import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import burger from "../Images/burger.png"
export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>{children}</div>
                <div className="iconWrapper">
                    <img src={burger} alt="Close" onClick={onClose} />
                </div>
            </div>

        </>,
        document.body
    );
};