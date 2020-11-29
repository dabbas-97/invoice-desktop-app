import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "companies",
  initialState: {
    data: [],
  },
  reducers: {
    setCompanies: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCompanies } = slice.actions;

export const selectCompanies = (state) => state.companies.data;

export default slice.reducer;
