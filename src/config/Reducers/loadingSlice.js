import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    startLoading: (state) => {
      state.value = true;
    },
    stopLoading: (state) => {
      state.value = false;
    },
  },
});

export const { startLoading, stopLoading } = slice.actions;

export const selectLoading = (state) => state.loading.value;

export default slice.reducer;
