import { createSlice } from "@reduxjs/toolkit";
import { createNanny, fetchNannies, fetchNannyById } from "./operations";

const initialState = {
  items: [],
  currentNanny: null,
  isLoading: false,
  error: null,
    page: 1,
  totalPages: 1,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchNannies
      .addCase(fetchNannies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
   .addCase(fetchNannies.fulfilled, (state, action) => {
  state.isLoading = false;
  console.log("📥 FULL PAYLOAD:", action.payload);
  state.items = action.payload.data || [];  // ✅ Беремо .data!
  state.page = action.payload.page;
  state.totalPages = action.payload.totalPages;
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
      })
      // createNanny
      .addCase(createNanny.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNanny.fulfilled, (state, action) => {
        state.isLoading = false;
        
        const nanny = action.payload;
        
        if (nanny && nanny._id) {
          // ✅ ПЕРЕВІРЯЄМО, ЧИ НЯНЯ УЖЕ Є
          const exists = state.items.some(item => item._id === nanny._id);
          
          if (!exists) {
            state.items.unshift(nanny);
            console.log("✅ Nanny added to Redux:", nanny.name, "Total:", state.items.length);
          } else {
            console.log("⚠️ Nanny already exists:", nanny.name);
          }
        } else {
          console.warn("⚠️ Invalid nanny:", nanny);
        }
      })
      .addCase(createNanny.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setPage } = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;