// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setFilters } from "../../store/slices/filtersSlice";
// import styles from "./index.module.css"; // Импортируем собственный файл стилей
// import sortIcon from "../../Images/icons/Sort.svg";

// const SORT_OPTIONS = [
//   { value: "default", label: "by default" },
//   { value: "priceAsc", label: "price: low to high" },
//   { value: "priceDesc", label: "price: high to low" },
// ];

// export const FavoritesFiltersBar = () => {
//   const dispatch = useDispatch();
//   const filters = useSelector((s) => s.filters);

//   const onInput = (e) => {
//     const { name, value } = e.target;
//     dispatch(setFilters({ [name]: value }));
//   };

//   const onReset = () => {
//     dispatch(setFilters({
//       priceFrom: '',
//       priceTo: '',
//       sortOrder: 'default',
//     }));
//   };

//   return (
//     <form className={styles.filtersBar} onSubmit={(e) => e.preventDefault()}>
//       <div className={styles.filterSection}>
//         <span className={styles.filterLabel}>Price</span>
//         <div className={styles.priceInputs}>
//           <input
//             type="number" min="0" name="priceFrom" placeholder="от"
//             value={filters.priceFrom} onChange={onInput} className={styles.priceInput}
//           />
//           <input
//             type="number" min="0" name="priceTo" placeholder="до"
//             value={filters.priceTo} onChange={onInput} className={styles.priceInput}
//           />
//         </div>
//       </div>

//       <div className={styles.filterSection}>
//         <span className={styles.filterLabel}>Sorted</span>
//         <div className={styles.sortControl}>
//           <select
//             name="sortOrder" value={filters.sortOrder}
//             onChange={onInput} className={styles.sortSelect}
//           >
//             {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//           </select>
//           <img src={sortIcon} alt="" aria-hidden="true" className={styles.sortIcon} />
//         </div>
//       </div>

//       <button type="button" className={styles.resetBtn} onClick={onReset}>
//         Reset
//       </button>
//     </form>
//   );
// };


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteFilters, resetFavoriteFilters } from "../../store/slices/favoriteFiltersSlice"; // <-- новый слайс
import styles from "./index.module.css"; // Импортируем собственный файл стилей
import sortIcon from "../../Images/icons/Sort.svg";

const SORT_OPTIONS = [
  { value: "default", label: "by default" },
  { value: "priceAsc", label: "price: low to high" },
  { value: "priceDesc", label: "price: high to low" },
];

export const FavoritesFiltersBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.favoriteFilters); // <-- используем фильтры только для Избранного

  const onInput = (e) => {
    const { name, value } = e.target;
    dispatch(setFavoriteFilters({ [name]: value }));
  };

  const onReset = () => {
    dispatch(resetFavoriteFilters()); // <-- сброс всех фильтров к исходным
  };

  return (
    <form className={styles.filtersBar} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.filterSection}>
        <span className={styles.filterLabel}>Price</span>
        <div className={styles.priceInputs}>
          <input
            type="number"
            min="0"
            name="priceFrom"
            placeholder="from"
            value={filters.priceFrom}
            onChange={onInput}
            className={styles.priceInput}
          />
          <input
            type="number"
            min="0"
            name="priceTo"
            placeholder="to"
            value={filters.priceTo}
            onChange={onInput}
            className={styles.priceInput}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <span className={styles.filterLabel}>Sorted</span>
        <div className={styles.sortControl}>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={onInput}
            className={styles.sortSelect}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <img src={sortIcon} alt="" aria-hidden="true" className={styles.sortIcon} />
        </div>
      </div>

      <button type="button" className={styles.resetBtn} onClick={onReset}>
        Reset
      </button>
    </form>
  );
};
