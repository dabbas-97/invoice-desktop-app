import React from "react";
import "./InvoiceDialog.css";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@material-ui/core";

export const InvoiceDialog = ({ dialogData }) => {
  return (
    <Dialog open={dialogData.openDialog} onClose={dialogData.cancel}>
      <div className="main-dialog ">
        <DialogTitle>{dialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogData.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogData.cancel} color="primary" autoFocus>
            الرجوع
          </Button>
          <Button onClick={dialogData.confirm} color="primary">
            {dialogData.action}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
