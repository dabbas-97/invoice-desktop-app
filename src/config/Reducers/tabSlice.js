import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "tab",
  initialState: {
    value: 0,
  },
  reducers: {
    moveToTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { moveToTab } = slice.actions;

export const selectTab = (state) => state.tab.value;

export default slice.reducer;
