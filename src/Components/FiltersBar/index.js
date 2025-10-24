import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../../store/slices/filtersSlice";
import styles from "./index.module.css";
import sortIcon from "../../Images/icons/Sort.svg";

const SORT_OPTIONS = [
  { value: "default", label: "by default" },
  { value: "priceAsc", label: "price: low to high" },
  { value: "priceDesc", label: "price: high to low" },
  { value: "discountDesc", label: "discount" },
];

export const FiltersBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const onInput = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };
  const onToggle = (e) => {
    const { name, checked } = e.target;
    dispatch(setFilters({ [name]: checked }));
  };

  return (
    <form className={styles.filtersBar} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.filterSection}>
        <span className={styles.filterLabel}>Price</span>
        <div className={styles.priceInputs}>
          <input
            type="number" min="0" name="priceFrom" placeholder="from"
            value={filters.priceFrom} onChange={onInput} className={styles.priceInput}
          />
          <input
            type="number" min="0" name="priceTo" placeholder="to"
            value={filters.priceTo} onChange={onInput} className={styles.priceInput}
          />
        </div>
      </div>

      <label className={styles.discountToggle}>
        <span className={styles.filterLabel}>Discounted items</span>
        <input
          type="checkbox" name="discountOnly"
          checked={filters.discountOnly} onChange={onToggle}
          className={styles.discountCheckbox}
        />
      </label>

      <div className={styles.filterSection}>
        <span className={styles.filterLabel}>Sorted</span>
        <div className={styles.sortControl}>
          <select
            name="sortOrder" value={filters.sortOrder}
            onChange={onInput} className={styles.sortSelect}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <img src={sortIcon} alt="" aria-hidden="true" className={styles.sortIcon} />
        </div>
      </div>

      <button type="button" className={styles.resetBtn} onClick={() => dispatch(resetFilters())}>
        Reset
      </button>
    </form>
  );
};
