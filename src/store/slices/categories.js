import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//createAsyncThunk() создаёт три разных экшена (три "сигнала" для Redux):

//строка "categories/fetchCategories" — это базовое имя
// Оно служит корнем, из которого Redux Toolkit автоматически создаёт три полных названия экшенов.
// fetch - принеси данные с сервера

export const fetchCategories = createAsyncThunk("categories/fetchCategories",
    async () => {
        try {
            const res = await fetch("http://localhost:3333/categories/all")


            if (!res.ok) {
                throw new Error(
                    `HTTP error! status:${res.status}`
                )
            }

            const data = await res.json();

            console.log(data)

            return data
        } catch (err) {
            throw err;
        }

    }
)



const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},

//state — это текущее состояние (current state) слайса, которое Redux автоматически передаёт в редьюсер при каждом вызове.
// Редьюсер (reducer) — это функция, которая живёт в Redux, и она меняет состояние в ответ на dispatch.

// extraReducers — это раздел внутри createSlice,
//который описывает, как слайс должен реагировать на экшены, не созданные им напрямую.
//В частности, сюда попадают асинхронные действия (thunks),
//созданные через createAsyncThunk().

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload; // ожидается массив categories
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || 'Failed to load categories'; // если сервер вернул сообщение ошибки → оно покажется пользователю; если сервер не дал сообщение → появится запасной текст.
            });
    }

});

export default categoriesSlice.reducer;


//селекторы
export const selectAllCategories = (state) => state.categories.items;
export const selectCategoriesStatus = (state) => state.categories.status;
export const selectCategoriesError = (state) => state.categories.error;


