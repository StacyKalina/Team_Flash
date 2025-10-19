import React from "react";
import styles from './NotFound.module.css';
import Button  from "../Components/MainButton";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useRef } from "react";
<Button text="Go Home" onClick={() => alert('Go Home!')} />

export const NotFound = () => {
    return (
        <div className={styles.notFoundPageContent}>
            <div className={styles.notFoundImgContent}/>
                <div className={styles.notFoundTextContent}/>  
            <Button text="Go Home" onClick={() => alert('Go Home!')} />    
                
        </div>
        
    )
}