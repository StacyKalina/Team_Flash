// import { createSlice } from "@reduxjs/toolkit";

// const globalSlice = createSlice({
//   name: "global",
//   initialState: {
//     isLoading: false,
//   },
//   reducers: {
//     startLoading: (state) => {
//       state.isLoading = true;
//     },
//     stopLoading: (state) => {
//       state.isLoading = false;
//     },
//   },
// });

// export const { startLoading, stopLoading } = globalSlice.actions;
// export const selectIsLoading = (state) => state.global.isLoading;
// export default globalSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    isLoading: false,
    activeRequests: 0, // чтобы корректно работало, даже если загружаются несколько запросов
  },
  reducers: {
    startRequest: (state) => {
      state.activeRequests += 1;
      state.isLoading = true;
    },
    finishRequest: (state) => {
      state.activeRequests = Math.max(0, state.activeRequests - 1);
      state.isLoading = state.activeRequests > 0;
    },
  },
});

export const { startRequest, finishRequest } = globalSlice.actions;
export const selectIsLoading = (state) => state.global.isLoading;
export default globalSlice.reducer;
