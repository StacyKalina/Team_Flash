import styles from './index.module.css'
import logo from '../../Images/logo.svg'
import cart from '../../Images/cart.svg'
import burgerMenuIcon from '../../Images/burger.svg'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Menu = () => {

const setActivKlass = ({ isActive }) => isActive ? styles.active : ""
const totalItems = useSelector((state) => state.cart?.totalItems ?? 0)
const hasItems = totalItems > 0
const displayCount = totalItems > 99 ? "99+" : totalItems

    return (
        <nav className={styles.navWrapper}>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={logo} alt='main logo' />
                </Link>
            </div>

            <ul className={styles.navItemsWrapper}>
                <li>
                    Main Page
                </li>

                <li>
                    <NavLink to="/categories"
                        className={setActivKlass}>
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/allProducts"
                        className={setActivKlass}>
                        All products
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/sales"
                        className={setActivKlass}>
                    All sales
                    </NavLink>
                    </li>
            </ul>

            <div className={styles.cart}>
                <Link
                    to="/cart"
                    className={styles.cartLink}
                    aria-label="Open cart"
                >
                    <img src={cart} alt='cart icon' />
                    {hasItems && (
                        <span className={styles.cartBadge} aria-live="polite">
                            {displayCount}
                        </span>
                    )}
                </Link>
            </div>
            <div className={styles.burgerMenu}>
                <img src={burgerMenuIcon} alt='burger icon' />
            </div>

        </nav>
    );

}
