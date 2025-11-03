// CHANGE: привёл компонент к одной согласованной разметке без конфликтных кусков
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";

import logo from "../../Images/logo.svg";
import cartIcon from "../../Images/cart.svg";
import burgerMenuIcon from "../../Images/burger.svg";
import favoriteIcon from "../../Images/icons/heart.svg";
import { ThemeToggle } from "../ThemeToggle";

// CHANGE: единый источник нав-ссылок
const NAV_LINKS = [
  { to: "/", label: "Main Page", end: true },
  { to: "/categories", label: "Categories" },
  { to: "/allProducts", label: "All products" },
  { to: "/sales", label: "All sales" },
];

export const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CHANGE: безопасные селекторы с ?? 0
  const favoriteItemsCount =
    useSelector((state) => state.favorites?.items?.length) ?? 0;
  const cartItemsCount = useSelector((state) => state.cart?.totalItems) ?? 0;

  // CHANGE: NavLink active класс переехал в функцию
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const cartHasItems = cartItemsCount > 0;
  const cartBadgeValue = cartItemsCount > 99 ? "99+" : String(cartItemsCount);

  // CHANGE: вынес генерацию пунктов меню, чтобы переиспользовать в мобайле
  const renderNavItems = (onNavigate) =>
    NAV_LINKS.map(({ to, label, end }) => (
      <li key={to} className={styles.navItem}>
        <NavLink to={to} end={end} className={setActiveClass} onClick={onNavigate}>
          {label}
        </NavLink>
      </li>
    ));

  return (
    <nav className={styles.navWrapper}>
      {/* CHANGE: вернул глобальную обёртку page__content + локальный layout */}
      <div className={`page__content ${styles.navContent}`}>
        {/* CHANGE: лево — бренд и переключатель темы (десктоп) */}
        <div className={styles.brandSection}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="main logo" />
          </Link>
          <div className={styles.themeToggleDesktop}>
            <ThemeToggle />
          </div>
        </div>

        {/* CHANGE: центр — список ссылок (десктоп). На мобиле скрывается через CSS */}
        <ul className={styles.navItemsWrapper}>{renderNavItems()}</ul>

        {/* CHANGE: право — иконки + бургер */}
        <div className={styles.iconsWrapper}>
          <Link
            to="/favorites"
            className={styles.favoriteIconWrapper}
            aria-label="Open favorites"
            onClick={closeMobileMenu} // CHANGE: закрывать мобильное меню при переходе
          >
            <img src={favoriteIcon} alt="favorite icon" className={styles.iconImage} />
            {favoriteItemsCount > 0 && (
              <span className={styles.favoriteCount}>{favoriteItemsCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={styles.cartLink}
            aria-label="Open cart"
            onClick={closeMobileMenu} // CHANGE: закрывать мобильное меню при переходе
          >
            <img src={cartIcon} alt="cart icon" className={styles.iconImage} />
            {cartHasItems && <span className={styles.cartBadge}>{cartBadgeValue}</span>}
          </Link>

          {/* CHANGE: бургер показывается только на мобиле по CSS */}
          <button
            type="button"
            className={styles.burgerMenu}
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
          >
            <img src={burgerMenuIcon} alt="burger icon" className={styles.iconImage} />
          </button>
        </div>
      </div>

      {/* CHANGE: мобильная панель-асайд для меню */}
      <aside
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={styles.mobileMenuClose}
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        >
          &times;
        </button>

        <div className={styles.mobileThemeToggle}>
          {/* CHANGE: тема и в мобильном меню */}
          <ThemeToggle />
        </div>

        <ul className={styles.mobileMenuList}>{renderNavItems(closeMobileMenu)}</ul>

        <div className={styles.mobileIcons}>
          <Link
            to="/favorites"
            className={styles.favoriteIconWrapper}
            aria-label="Open favorites"
            onClick={closeMobileMenu}
          >
            <img src={favoriteIcon} alt="favorite icon" className={styles.iconImage} />
            {favoriteItemsCount > 0 && (
              <span className={styles.favoriteCount}>{favoriteItemsCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={styles.cartLink}
            aria-label="Open cart"
            onClick={closeMobileMenu}
          >
            <img src={cartIcon} alt="cart icon" className={styles.iconImage} />
            {cartHasItems && <span className={styles.cartBadge}>{cartBadgeValue}</span>}
          </Link>
        </div>
      </aside>

      {/* CHANGE: фон-подложка под мобильным меню */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className={styles.mobileMenuBackdrop}
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
};



