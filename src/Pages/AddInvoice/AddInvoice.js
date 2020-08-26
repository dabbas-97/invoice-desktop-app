import React, { useEffect } from "react";
import "./AddInvoice.css";
import { Fade, CircularProgress } from "@material-ui/core";
import "date-fns";
import { InvoiceForm } from "../forms/InvoiceForm/InvoiceForm";
import { InvoiceDialog } from "../forms/InvoiceDialog/InvoiceDialog";
import axios from "axios";

const AddInvoice = ({
  handleInvoice,
  invoiceData,
  handleCheque,
  clearInvoiceData,
  dialog,
  setDialog,
  loading,
  setLoading,
  postInvoice,
}) => {
  //! Dialog for Addition
  const proceed = () => {
    setDialog({
      action: "‘إضافة",
      title: `إضافة فاتورة جديدة `,
      message: "سيتم إضافة الفاتورة ، إتمام العملية؟",
      openDialog: true,
      cancel() {
        setDialog({ openDialog: false });
      },
    });
  };
  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:5000/invoices/api/count").then((doc) => {
      clearInvoiceData(doc.data.count.count + 1);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {loading ? (
        <div className="empty-section">
          <CircularProgress className="spinner" />
        </div>
      ) : (
        <Fade in={true} timeout={500}>
          <div className="add_invoice">
            <InvoiceForm
              handleInvoice={handleInvoice}
              invoice={invoiceData}
              handleCheque={handleCheque}
              proceed={proceed}
            />
            <InvoiceDialog
              dialogData={dialog}
              loading={loading}
              submit={postInvoice}
            />
          </div>
        </Fade>
      )}
    </div>
  );
};

export default AddInvoice;
