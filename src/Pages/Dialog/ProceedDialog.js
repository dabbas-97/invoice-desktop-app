import React, { useEffect } from "react";
import "./Dialog.css";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDialog,
  selectDialogInfo,
  selectDialogIsOpen,
  submitDialog,
} from "../../config/Reducers/dialogSlice";

export const ProceedDialog = () => {
  const dispatch = useDispatch();
  const dialogData = useSelector(selectDialogInfo);
  const open = useSelector(selectDialogIsOpen);
  const action = () => {
    dispatch(submitDialog());
  };
  const close = () => {
    dispatch(closeDialog());
    console.log("toto");
  };
  return (
    <Dialog open={open} onClose={() => close()}>
      <div className='main-dialog '>
        <div>
          <DialogTitle>{dialogData.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogData.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => close()} color='primary' autoFocus>
              الرجوع
            </Button>
            <Button onClick={() => action()} color='primary'>
              {dialogData.action}
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};
