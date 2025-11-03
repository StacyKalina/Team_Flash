import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../MainButton";

export const MainBanner = () => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/cart");
  };

  return (
     <div className={styles.bannerWrapper}>
      <div className={styles.bannerContent}>
        <h1 className={styles.MainHeader}>
          Amazing Discounts on Garden Products!
        </h1>
        <Button text="Check out" onClick={handleCheckoutClick} />
      </div>
    </div>
  );
};