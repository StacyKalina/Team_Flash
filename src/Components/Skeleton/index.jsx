import React from "react";
import styles from "./index.module.css";

export const  Skeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonBox}></div>
      <div className={styles.skeletonBox}></div>
      <div className={styles.skeletonBox}></div>
    </div>
  );
};


