import React from "react";
import styles from "./index.module.css";
import img1 from "../../Images/category_img/1.jpeg";
import img2 from "../../Images/category_img/2.jpeg";
import img3 from "../../Images/category_img/3.jpeg";
import img4 from "../../Images/category_img/4.jpeg";
// import allCategories from "../../Images/allCategories.svg";

const categories = [
  { id: 1, title: "Fertilizer", image: img1 },
  { id: 2, title: "Protective products and septic tanks", image: img2 },
  { id: 3, title: "Planting material", image: img3 },
  { id: 4, title: "Tools and equipment", image: img4 },
];

export const Categories = () => {
  return (
    <section className={styles.categories}>
    {/* //   <div className={styles.header}>
    //     <h2>Categories</h2>

    //     <div>
    //       <button className={styles.allBtn}>
    //         <img src={allCategories} alt="All Categories" />
    //       </button>
    //     </div>
    //   </div> */}

      <div className={styles.list}>
        {categories.map((img) => (
          <div key={img.id} className={styles.card}>
            <img src={img.image} alt={img.title} />
            <p>{img.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
