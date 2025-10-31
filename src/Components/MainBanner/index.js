import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../MainButton";



export const MainBanner = () => {
    return (
        <nav>
            <div className={styles.BannerWrapper} >
                <div className={styles.BannerContent}>
                    < h1 className={styles.MainHeader}>
                        Amazing Discounts on Garden Products!
                    </h1>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : ""}                >
                        <Button text="Check out" />
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};







//   const navigate = useNavigate();

//   const handleCheckoutClick = () => {
//     navigate("/cart");
//   };

//   return (
//     <div className={styles.BannerWrapper}>
//       <div className={styles.BannerContent}>
//         <h1 className={styles.MainHeader}>
//           Amazing Discounts on Garden Products!
//         </h1>
//         <Button text="Check out" onClick={handleCheckoutClick} />
//       </div>
//     </div>
//   );
// };

