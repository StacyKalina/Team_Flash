import styles from './index.module.css'
import logo from '../../Images/logo.svg'
import cart from '../../Images/cart.svg'
import burgerMenuIcon from '../../Images/burger.svg'
import {Link, NavLink} from 'react-router-dom'

export const Menu = () => {
    return (
        <nav className = {styles.navWrapper}>
            <div className = {styles.logo}>
                <img src = {logo} alt = 'main logo'/>
            </div>

            <ul className = {styles.navItemsWrapper}>
                <li><NavLink to = "/" className={({isActive}) =>isActive?styles.active:""}>
                 Main Page </NavLink>
                </li>
                <li><NavLink to = "/categories" className={({isActive}) =>isActive?styles.active:""}>
                 Categories </NavLink>
                </li>
                <li><NavLink to ="/allproducts" className={({isActive}) =>isActive?styles.active:""}>
                 All products </NavLink>
                </li>
                <li><NavLink to ="/allsales" className={({isActive}) =>isActive?styles.active:""}>
                All Sales</NavLink></li>
            </ul>
            
            <div className = {styles.cart}>
              <NavLink to ="/cart"> 
                <img src = {cart} alt = 'cart icon'/>
                </NavLink> 
            </div>
            <div className = {styles.burgerMenu}>
             <img src = {burgerMenuIcon} alt = 'burger icon'/>
            </div>
            
        </nav>
    );

}