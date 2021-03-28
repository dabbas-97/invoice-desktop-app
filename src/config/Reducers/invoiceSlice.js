import { createSlice } from "@reduxjs/toolkit";

const initState = {
  _id: null,
  invoiceNumber: 0,
  amount: 0,
  amountLetters: "",
  creationDate: new Date().toString(),
  includeTax: false,
  name: "",
  location: "",
  phoneNumber: "",
  concernedPerson: "",
  email: "",
  description: "",
  duration: "",
};
export const slice = createSlice({
  name: "invoice",
  initialState: {
    data: {
      ...initState,
    },
  },
  reducers: {
    setInvoice: (state, action) => {
      state.data = action.payload;
    },
    clearInvoice: (state) => {
      state.data = { ...initState };
    },
  },
});

export const { setInvoice, clearInvoice } = slice.actions;

export const selectInvoice = (state) => state.invoice.data;

export default slice.reducer;
