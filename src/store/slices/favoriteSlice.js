import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);

      if (index !== -1) {
        state.items.splice(index, 1); // Удалить, если уже в избранном
      } else {
        state.items.push(product); // Добавить, если нет
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;