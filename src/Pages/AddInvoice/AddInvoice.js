import React, { useEffect } from "react";
import "./AddInvoice.css";
import { Fade } from "@material-ui/core";
import "date-fns";
import { InvoiceForm } from "../forms/InvoiceForm/InvoiceForm";
import { InvoiceDialog } from "../forms/InvoiceDialog/InvoiceDialog";

const AddInvoice = ({
  handleInvoice,
  invoiceData,
  handleCheque,
  clearInvoiceData,
  dialog,
  setDialog,
}) => {
  const proceed = () => {
    setDialog({
      action: "حفظ",
      title: `إضافة فاتورة جديدة `,
      message: "سيتم إضافة الفاتورة ، إتمام العملية؟",
      openDialog: true,
      confirm() {
        //Todo delete the invoice with the id (dialog.id)
        invoiceData.confirm();
        setDialog({ openDialog: false });
      },
      cancel() {
        console.log("cancel deletion");
        setDialog({ openDialog: false });
      },
    });
  };
  useEffect(() => {
    clearInvoiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fade in={true} timeout={500}>
      <div className="add_invoice">
        <InvoiceForm
          handleInvoice={handleInvoice}
          invoice={invoiceData}
          handleCheque={handleCheque}
          proceed={proceed}
        />
        <InvoiceDialog dialogData={dialog} />
      </div>
    </Fade>
  );
};

export default AddInvoice;
