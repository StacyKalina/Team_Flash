import styles from './index.module.css'
import logo from '../../Images/logo.svg'
import cart from '../../Images/cart.svg'
import burgerMenuIcon from '../../Images/burger.svg'

import { Link, NavLink } from "react-router-dom";




export const Menu = () => {

const setActivKlass = ({ isActive }) => isActive ? styles.active : ""

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
                <img src={cart} alt='cart icon' />
            </div>
            <div className={styles.burgerMenu}>
                <img src={burgerMenuIcon} alt='burger icon' />
            </div>

        </nav>
    );

}