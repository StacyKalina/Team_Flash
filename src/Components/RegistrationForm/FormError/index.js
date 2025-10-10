import React from "react";
import styles from './index.module.css'
//import icon from './icon.svg';
//<img src={icon} alt="error-icon"></img>

export const FormError = ({text}) => {
    return (
        <div className={styles.error}>
        <span className="errorMessage">{text}</span>   
        </div>
    );
}