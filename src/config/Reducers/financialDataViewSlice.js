import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "financialDataView",
  initialState: {
    invoiceData: 0,
    receiptData: 0,
  },
  reducers: {
    changeInvoicesDataView: (state, action) => {
      state.invoiceData = action.payload;
    },
    changeReceiptsDataView: (state, action) => {
      state.receiptData = action.payload;
    },
  },
});

export const { changeInvoicesDataView, changeReceiptsDataView } = slice.actions;

export const selectInvoicesDataView = (state) =>
  state.financialDataView.invoiceData;
export const selectReceiptsDataView = (state) =>
  state.financialDataView.receiptData;

export default slice.reducer;
