import React, { useState, useEffect } from "react";
import AllInvoices from "./Components/AllInvoices/AllInvoices";
import { InvoiceForm } from "../forms/InvoiceForm/InvoiceForm";
import { Fade } from "@material-ui/core";
import { InvoiceDialog } from "../forms/InvoiceDialog/InvoiceDialog";

import axios from "axios";

const MyInvoices = ({
  handleInvoice,
  invoiceData,
  handleCheque,
  setInvoiceData,
  clearInvoiceData,
  setDialog,
  dialog,
}) => {
  const [viewType, setViewType] = useState("allInvoices");
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);

  //! Fetching all invoices from the database and inserting them into invoices state

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:5000/invoices/api/")
      .then((fetchedInvoices) => {
        if (fetchedInvoices.data.length) {
          setInvoices(fetchedInvoices.data.sort((a, b) => a.number - b.number));
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [editId, setEditId] = useState("");

  const editInvoice = (id) => {
    const invoice = invoices.find((invoice) => invoice._id === id);
    setEditId(id);
    setInvoiceData({
      ...invoice,
      cancel() {
        clearInvoiceData();
        setViewType("allInvoices");
      },
    });
    setViewType("editInvoice");
  };
  //! Dialog for edit
  const proceed = () => {
    setDialog({
      action: "حفظ",
      title: `حفظ التغييرات `,
      message: "سيتم حفظ التغييرات على الفاتورة ، إتمام العملية؟",
      openDialog: true,

      cancel() {
        setDialog({ openDialog: false });
      },
    });
  };

  const confirmEdit = () => {
    axios
      .patch(`http://127.0.0.1:5000/invoices/api/${editId}`, invoiceData)
      .then((data) => {
        setInvoices(
          invoices.map((invoice) =>
            invoice._id === editId ? invoiceData : invoice
          )
        );
        setDialog({ openDialog: false });
        setViewType("allInvoices");
        clearInvoiceData();
      });
  };

  const [deleteId, setDeleteId] = useState("");
  useEffect(() => {}, [deleteId]);

  const confirmDeletion = () => {
    axios.delete(`http://127.0.0.1:5000/invoices/api/${deleteId}`).then(() => {
      setInvoices(invoices.filter((invoice) => invoice._id !== deleteId));
      setDialog({ openDialog: false });
      setDeleteId("");
    });
  };
  return (
    <>
      <div>
        {viewType === "allInvoices" ? (
          <AllInvoices
            invoiceData={invoices}
            editInvoice={editInvoice}
            dialog={dialog}
            setDialog={setDialog}
            loading={loading}
            setDeleteId={setDeleteId}
          />
        ) : (
          <Fade in={true} timeout={500}>
            <div className="add_invoice">
              <InvoiceForm
                handleInvoice={handleInvoice}
                invoice={invoiceData}
                handleCheque={handleCheque}
                proceed={proceed}
                dialog={dialog}
              />
            </div>
          </Fade>
        )}
        <InvoiceDialog
          dialogData={dialog}
          confirmDeletion={confirmDeletion}
          completeEdit={confirmEdit}
        />
      </div>
    </>
  );
};

export default MyInvoices;
