import styles from "./index.module.css";
import { useTheme } from "../../context/ThemeContext";

const SunIcon = () => (
  <svg
    className={styles.svg}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2.5" x2="12" y2="5.5" />
    <line x1="12" y1="18.5" x2="12" y2="21.5" />
    <line x1="2.5" y1="12" x2="5.5" y2="12" />
    <line x1="18.5" y1="12" x2="21.5" y2="12" />
    <line x1="5.05" y1="5.05" x2="7.19" y2="7.19" />
    <line x1="16.81" y1="16.81" x2="18.95" y2="18.95" />
    <line x1="16.81" y1="7.19" x2="18.95" y2="5.05" />
    <line x1="5.05" y1="18.95" x2="7.19" y2="16.81" />
  </svg>
);

const MoonIcon = () => (
  <svg
    className={styles.svg}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M21 15.5C19.7639 15.9975 18.4194 16.25 17 16.25C12.4437 16.25 8.75 12.5563 8.75 8C8.75 6.58055 9.00251 5.23612 9.5 4C6.01505 5.40346 3.5 8.9329 3.5 13C3.5 18.2467 7.75329 22.5 13 22.5C17.0671 22.5 20.5965 19.9849 22 16.5C21.6596 16.1911 21.3355 15.8589 21 15.5Z" />
  </svg>
);

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className={`${styles.toggle} ${isDark ? styles.toggleDark : ""}`}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
    >
      <span className={styles.thumb} aria-hidden="true" />
      <span className={`${styles.icon} ${styles.iconSun}`} aria-hidden="true">
        <SunIcon />
      </span>
      <span className={`${styles.icon} ${styles.iconMoon}`} aria-hidden="true">
        <MoonIcon />
      </span>
    </button>
  );
};

