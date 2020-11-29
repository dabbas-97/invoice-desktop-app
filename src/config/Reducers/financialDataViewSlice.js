import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "financialDataView",
  initialState: {
    value: 0,
  },
  reducers: {
    changeView: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeView } = slice.actions;

export const selectFinancialDataView = (state) => state.financialDataView.value;

export default slice.reducer;
