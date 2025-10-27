import styles from "./index.module.css";
import logo from "../../Images/logo.svg";
import cart from "../../Images/cart.svg";
import burgerMenuIcon from "../../Images/burger.svg";
import favoriteIcon from "../../Images/icons/heart.svg";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export const Menu = () => {
  const favoriteItemsCount = useSelector(
    (state) => state.favorites.items.length
  );
  const setActivKlass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="main logo" />
        </Link>
      </div>

      <ul className={styles.navItemsWrapper}>
        <li>
          <NavLink to="/" className={setActivKlass}>
            Main Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={setActivKlass}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/allProducts" className={setActivKlass}>
            All products
          </NavLink>
        </li>
        <li>
          <NavLink to="/sales" className={setActivKlass}>
            All sales
          </NavLink>
        </li>
      </ul>

      <div className={styles.iconsWrapper}>
        <Link to="/favorites" className={styles.favoriteIconWrapper}>
          <img src={favoriteIcon} alt="favorite icon" />
          {favoriteItemsCount > 0 && (
            <span className={styles.favoriteCount}>{favoriteItemsCount}</span>
          )}
        </Link>
        <div className={styles.cart}>
          <img src={cart} alt="cart icon" />
        </div>
      </div>

      <div className={styles.burgerMenu}>
        <img src={burgerMenuIcon} alt="burger icon" />
      </div>
    </nav>
  );
};
