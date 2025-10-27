import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceFrom: '',
  priceTo: '',
  sortOrder: 'default',
};

const favoriteFiltersSlice = createSlice({
  name: 'favoriteFilters',
  initialState,
  reducers: {
    setFavoriteFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFavoriteFilters: () => initialState,
  },
});

export const { setFavoriteFilters, resetFavoriteFilters } = favoriteFiltersSlice.actions;
export default favoriteFiltersSlice.reducer;
