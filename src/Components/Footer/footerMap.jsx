import React from "react";
import styles from "./index.module.css";
import mapImage from "../../Images/map.png";

export const FooterMap = () => {
    return (
        <div className={styles.mapWrapper}>
            <img src={mapImage} alt="Location map" />
        </div>
    );
};

export default FooterMap;
