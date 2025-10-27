import React from "react";
import styles from "./index.module.css";
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Linkstra%C3%9Fe%202%2010785%20Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed";

export const FooterMap = () => {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
                <iframe
                    title="Google map showing Linkstrasse 2, Berlin"
                    src={MAP_EMBED_SRC}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
};

export default FooterMap;
