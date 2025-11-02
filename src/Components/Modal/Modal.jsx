
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import closedIcon from "../../Images/icons/ic-xw.svg";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Затемнение фона */}
      <div className={styles.modalBackdrop} onClick={onClose}></div>

      {/* Контейнер модалки */}
      <div className={styles.modalOverlay}>
        {/* Контент */}
        <div className={styles.modalContent}>
          {children}
        </div>

        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
           className={styles.closeButton}
          aria-label="Close modal"
        >
          <img
            src={closedIcon}
            alt="Close"
            className={styles.closeIcon}
          />
        </button>
      </div>
    </>,
    document.body
  );
};
