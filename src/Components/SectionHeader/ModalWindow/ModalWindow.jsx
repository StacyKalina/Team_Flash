import styles from "./ModalWindow.module.css";
import ReactDOM from "react-dom";
import modal from "../Images/modal.png"
export const ModalWindow = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>{children}</div>
                <div className="iconWrapper">
                    <img src={modal} alt="Close" onClick={onClose} />
                </div>
            </div>

        </>,
        document.body
    );
};