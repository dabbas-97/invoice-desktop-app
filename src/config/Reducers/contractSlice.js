import { createSlice } from "@reduxjs/toolkit";

const initState = {
  _id: null,
  description: "",
  duration: "",
};
export const slice = createSlice({
  name: "contract",
  initialState: {
    info: {
      ...initState,
    },
  },
  reducers: {
    setContract: (state, action) => {
      state.info = action.payload;
    },
    clearContract: (state) => {
      state.info = { ...initState };
    },
  },
});

export const { setContract, clearContract } = slice.actions;

export const selectContractInfo = (state) => state.contract.info;

export default slice.reducer;
