import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "",          // A to Z, Z to A
  priceFilter: "",   // Less than 10$, Greater than 10$
  popularity: "",    // Popular, Not popular
  isLoading: false,
  error: null,
};

const nanniesFiltersSlice = createSlice({
  name: "nanniesFilters",
  initialState,
  reducers: {
    setSortFilter(state, action) {
      state.sort = action.payload;
    },
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },
    setPopularityFilter(state, action) {
      state.popularity = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSortFilter,
  setPriceFilter,
  setPopularityFilter,
  resetFilters,
} = nanniesFiltersSlice.actions;

export const nanniesFiltersReducer = nanniesFiltersSlice.reducer;
