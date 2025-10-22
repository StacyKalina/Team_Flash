import React from "react";
import styles from './index.module.css';
import icon from './icon.svg';


export const FormError = ({text}) => {
    return (
        <div className={styles.error}>
         <img src={icon} alt="error-icon"></img>
        <p className="errorMessage">{text}</p>   
        </div>
    );
}