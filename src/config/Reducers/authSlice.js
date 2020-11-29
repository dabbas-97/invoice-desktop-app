import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    link: "http://localhost:5000",
  },
});

export const selectLink = (state) => state.auth.link;

export default slice.reducer;
