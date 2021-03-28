import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "invoices",
  initialState: {
    data: [],
  },
  reducers: {
    setInvoices: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setInvoices } = slice.actions;

export const selectInvoices = (state) => state.invoices.data;

export default slice.reducer;
