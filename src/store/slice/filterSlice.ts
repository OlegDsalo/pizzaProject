import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterSliceState {
  categoryId: number;
  page: number;
  sortType: { name: string; sort: string; order: string };
}
const initialState: filterSliceState = {
  categoryId: 0,
  page: 1,
   sortType :{ name: "популярність(asc)", sort: "rating", order: "asc" },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<{ name: string; sort: string; order: string }>) {
      state.sortType = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sortType = action.payload.sortType;
        state.categoryId = Number(action.payload.categoryId);
        state.page = Number(action.payload.page);
      } else {
        state.categoryId = 0;
        state.page = 1;
        state.sortType = { name: "популярність(asc)", sort: "rating", order: "asc" };
      }
    },
  },
});

export const { setCategoryId, setSortType, setPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
