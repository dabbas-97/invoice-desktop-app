import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "receipts",
  initialState: {
    data: [],
  },
  reducers: {
    setReceipts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setReceipts } = slice.actions;

export const selectReceipts = (state) => state.receipts.data;

export default slice.reducer;
