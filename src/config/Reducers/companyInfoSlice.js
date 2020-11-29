import { createSlice } from "@reduxjs/toolkit";

const initState = {
  _id: null,
  name: "",
  location: "",
  phoneNumber: "",
  concernedPerson: "",
  email: "",
};
export const slice = createSlice({
  name: "companyInfo",
  initialState: {
    data: {
      ...initState,
    },
  },
  reducers: {
    setCompanyInfo: (state, action) => {
      state.data = action.payload;
    },
    clearCompanyInfo: (state) => {
      state.data = { ...initState };
    },
  },
});

export const { setCompanyInfo, clearCompanyInfo } = slice.actions;

export const selectCompanyInfo = (state) => state.companyInfo.data;

export default slice.reducer;
