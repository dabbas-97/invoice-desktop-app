import React from "react";
import "./InvoiceDialog.css";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  CircularProgress,
} from "@material-ui/core";

export const InvoiceDialog = ({
  dialogData,
  loading,
  submit,
  confirmDeletion,
  completeEdit,
}) => {
  const action = () => {
    if (dialogData.action === "حذف") confirmDeletion();
    else if (dialogData.action === "حفظ") completeEdit();
    else submit();
  };
  return (
    <Dialog open={dialogData.openDialog} onClose={dialogData.cancel}>
      <div className="main-dialog ">
        {loading ? (
          <CircularProgress className="spinner" />
        ) : (
          <div>
            <DialogTitle>{dialogData.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{dialogData.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={dialogData.cancel} color="primary" autoFocus>
                الرجوع
              </Button>
              <Button onClick={() => action()} color="primary">
                {dialogData.action}
              </Button>
            </DialogActions>
          </div>
        )}
      </div>
    </Dialog>
  );
};
