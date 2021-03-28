import { createSlice } from "@reduxjs/toolkit";

const initState = {
  _id: null,
  receiptNumber: 0,
  amount: 0,
  amountLetters: "",
  creationDate: new Date().toString(),
  name: "",
  location: "",
  phoneNumber: "",
  concernedPerson: "",
  email: "",
  description: "",
  duration: "",
  isCheque: false,
  cheque: {
    chequeNumber: "",
    chequeBank: "",
    chequeBankBranch: "",
    chequeDate: new Date().toString(),
  },
};
export const slice = createSlice({
  name: "receipt",
  initialState: {
    data: {
      ...initState,
    },
  },
  reducers: {
    setReceipt: (state, action) => {
      state.data = action.payload;
    },
    clearReceipt: (state) => {
      state.data = { ...initState };
    },
  },
});

export const { setReceipt, clearReceipt } = slice.actions;

export const selectReceipt = (state) => state.receipt.data;

export default slice.reducer;
