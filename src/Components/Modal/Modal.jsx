// import styles from "./Modal.module.css";
// import ReactDOM from "react-dom";
// import closeIcon from "../../Images/icons/ic-x.svg";
//  // let isModalOpen=false;
// export const Modal = ({ isOpen, onClose, children }) => {
//    if (!isOpen) {return null;}

//     return ReactDOM.createPortal(
//         <>
//             <div className={styles.modalBackdrop}></div>
//             <div className={styles.modalOverlay}>
//                 <div className={styles.modalContent}>{children}</div>
//                 <div className={styles.iconWrapper}>
//                   <img src={closeIcon} alt="Close" onClick={onClose}/> 
//                 </div>
//             </div>

//         </>,
//         document.body
//     );
// }
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import closeIcon from "../../Images/icons/ic-x.svg";

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
            src={closeIcon}
            alt="Close"
            className={styles.closeIcon}
          />
        </button>
      </div>
    </>,
    document.body
  );
};
