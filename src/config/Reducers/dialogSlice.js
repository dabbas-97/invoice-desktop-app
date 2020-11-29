import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "dialog",
  initialState: {
    info: {
      action: "",
      title: "",
      message: "",
    },
    isSubmitted: false,
    isOpen: false,
  },
  reducers: {
    openDialog: (state, action) => {
      state.info = { ...action.payload };
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.info = { action: "", title: "", message: "" };
      state.isOpen = false;
      state.isSubmitted = false;
    },
    submitDialog: (state) => {
      state.isSubmitted = true;
    },
  },
});

export const { openDialog, closeDialog, submitDialog } = slice.actions;

export const selectDialogInfo = (state) => state.dialog.info;
export const selectDialogIsOpen = (state) => state.dialog.isOpen;
export const selectDialogIsSubmitted = (state) => state.dialog.isSubmitted;

export default slice.reducer;
