import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceFrom: "",
  priceTo: "",
  discountOnly: false,
  sortOrder: "default",    // default | priceAsc | priceDesc | discountDesc
};


const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;