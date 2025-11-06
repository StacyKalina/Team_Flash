import styles from "./index.module.css";
import icon from "./icon.svg";

export const FormError = ({ text, id, className }) => {
  const combinedClassName = [styles.error, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName} id={id} role="alert" aria-live="polite">
      <img src={icon} alt="" aria-hidden="true" />
      <p className={styles.errorMessage}>{text}</p>
    </div>
  );
};
