import styles from './index.module.css'
import logo from '../../Images/logo.svg'
import cart from '../../Images/cart.svg'
import burgerMenuIcon from '../../Images/burger.svg'




export const Menu = () => {
    return (
        <nav className = {styles.navWrapper}>
            <div className = {styles.logo}>
                <img src = {logo} alt = 'main logo'/>
            </div>

            <ul className = {styles.navItemsWrapper}>
                <li> Main Page </li>
                <li> Categories </li>
                <li> All products </li>
                <li> All sales </li>
            </ul>
            
            <div className = {styles.cart}>
             <img src = {cart} alt = 'cart icon'/>
            </div>
            <div className = {styles.burgerMenu}>
             <img src = {burgerMenuIcon} alt = 'burger icon'/>
            </div>
            
        </nav>
    );

}