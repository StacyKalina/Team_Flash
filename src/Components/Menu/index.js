import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";
import logo from "../../Images/logo.svg";
import cartIcon from "../../Images/cart.svg";
import burgerMenuIcon from "../../Images/burger.svg";
import favoriteIcon from "../../Images/icons/heart.svg";

const NAV_LINKS = [
  { to: "/", label: "Main Page", end: true },
  { to: "/categories", label: "Categories" },
  { to: "/allProducts", label: "All products" },
  { to: "/sales", label: "All sales" },
];

export const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const favoriteItemsCount =
    useSelector((state) => state.favorites?.items?.length) ?? 0;
  const cartItemsCount =
    useSelector((state) => state.cart?.totalItems) ?? 0;

  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const cartHasItems = cartItemsCount > 0;
  const cartBadgeValue =
    cartItemsCount > 99 ? "99+" : String(cartItemsCount);

  const renderNavItems = (onNavigate) =>
    NAV_LINKS.map(({ to, label, end }) => (
      <li key={to} className={styles.navItem}>
        <NavLink
          to={to}
          end={end}
          className={setActiveClass}
          onClick={onNavigate}
        >
          {label}
        </NavLink>
      </li>
    ));

  return (
    <nav className={styles.navWrapper}>
      <div className={`page__content ${styles.navContent}`}>

        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="main logo" />
          </Link>
        </div>

        <ul className={styles.navItemsWrapper}>{renderNavItems()}</ul>

        <div className={styles.iconsWrapper}>
          <Link
            to="/favorites"
            className={styles.favoriteIconWrapper}
            aria-label="Open favorites"
          >
            <img src={favoriteIcon} alt="favorite icon" />
            {favoriteItemsCount > 0 && (
              <span className={styles.favoriteCount}>
                {favoriteItemsCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={styles.cartLink}
            aria-label="Open cart"
            onClick={closeMobileMenu}
          >
            <img src={cartIcon} alt="cart icon" />
            {cartHasItems && (
              <span className={styles.cartBadge}>{cartBadgeValue}</span>
            )}
          </Link>
        </div>

        <button
          type="button"
          className={styles.burgerMenu}
          aria-label="Toggle navigation menu"
          onClick={toggleMobileMenu}
        >
          <img src={burgerMenuIcon} alt="burger icon" />
        </button>
      </div>

      <aside
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""
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

        <ul className={styles.mobileMenuList}>
          {renderNavItems(closeMobileMenu)}
        </ul>

        <div className={styles.mobileIcons}>
          <Link
            to="/favorites"
            className={styles.favoriteIconWrapper}
            aria-label="Open favorites"
            onClick={closeMobileMenu}
          >
            <img src={favoriteIcon} alt="favorite icon" />
            {favoriteItemsCount > 0 && (
              <span className={styles.favoriteCount}>
                {favoriteItemsCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={styles.cartLink}
            aria-label="Open cart"
            onClick={closeMobileMenu}
          >
            <img src={cartIcon} alt="cart icon" />
            {cartHasItems && (
              <span className={styles.cartBadge}>{cartBadgeValue}</span>
            )}
          </Link>
        </div>
      </aside>

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
