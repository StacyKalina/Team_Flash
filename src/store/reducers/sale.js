import { createSlice } from "@reduxjs/toolkit"


const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        userHasSale: false,
        saleAmount: 0,
        isLoading: false
    },
    reducers:{ // лариса
        setSaleAmount: (state) => {},  // что она умеет
        setHasSale: (state) => {},
        setIsLoading: (state) => {},
    }
});

export default saleSlice.reducer;