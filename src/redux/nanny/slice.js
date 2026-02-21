import { createSlice } from "@reduxjs/toolkit";
import { fetchNannies, fetchNannyById } from "./operations";

const initialState = {
  items: [],
  currentNanny: null,
  isLoading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  extraReducers: (builder) => {
    builder
      // fetchNannies
      .addCase(fetchNannies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchNannyById
      .addCase(fetchNannyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNannyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentNanny = action.payload;
      })
      .addCase(fetchNannyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const nanniesReducer = nanniesSlice.reducer;