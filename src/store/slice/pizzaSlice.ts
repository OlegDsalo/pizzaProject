import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Pizza {
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}
interface PizzaSliceState {
  items: Pizza[];
  error: string;
  isLoading: boolean;
}
const initialState: PizzaSliceState = {
  items: [],
  error: "",
  isLoading: false,
};

export interface FetchPizzaParams {
  category: string;
  page: number;
  name: string;
  sort: string;
  order: string;
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaParams>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { category, page, sort, order } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62efebd657311485d12ad5ea.mockapi.io/items?${category}&sortBy=${sort}&order=${order}&page=${page}&limit=${8}`,
    );
    return data;
  },
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.isLoading = true;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.error = "fetch error";
      state.items = [];
      state.isLoading = false;
    });
  },
  // [fetchPizzas.pending]: (state) => {
  //   state.isLoading = true;
  //   state.items = [];
  // },
  // [fetchPizzas.fulfilled]: (state, action) => {
  //   state.items = action.payload;
  //   state.isLoading = false;
  // },
  // [fetchPizzas.rejected]: (state, action) => {
  //   state.error = action.error;
  //   state.items = [];
  //   state.isLoading = false;
  // },
});


export default pizzaSlice.reducer;
