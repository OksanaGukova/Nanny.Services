import { createSlice } from "@reduxjs/toolkit";
import NannysData from "../../babysitters.json";

const initialState = {
  items: NannysData, // 👈 саме так
  isLoading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {
    // якщо потрібно буде додавати/оновлювати дані
  },
});

export const nanniesReducer = nanniesSlice.reducer;


