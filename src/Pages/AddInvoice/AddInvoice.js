import React, { useState, useEffect } from "react";
import "./AddInvoice.css";
import { Fade } from "@material-ui/core";
import "date-fns";
import { InvoiceForm } from "./Components/InvoiceForm";

const AddInvoice = ({ setTab }) => {
  const [invoiceData, setInvoiceData] = useState({
    number: 1123,
    name: "",
    location: "",
    manager: "",
    phone: "",
    email: "",
    contract: "",
    amountWords: "",
    amountNumbers: 0,
    duration: "",
    payment: "cash",
    date: new Date(),
    cheque: {
      number: "",
      bank: "",
      branch: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    console.log(invoiceData);
  }, [invoiceData]);

  const handleInvoice = (value) => (e) => {
    if (value === "date") {
      setInvoiceData({ ...invoiceData, date: e });
    } else {
      setInvoiceData({ ...invoiceData, [value]: e.target.value });
    }
  };
  const handleCheque = (value) => (e) => {
    if (value === "date") {
      setInvoiceData({
        ...invoiceData,
        cheque: { ...invoiceData.cheque, date: e },
      });
    } else {
      setInvoiceData({
        ...invoiceData,
        cheque: { ...invoiceData.cheque, [value]: e.target.value },
      });
    }
  };

  const submitData = () => {
    console.log("submited!!");
    setTab(1);
  };

  return (
    <Fade in={true} timeout={500}>
      <div className="add_invoice">
        <InvoiceForm
          handleInvoice={handleInvoice}
          setTab={setTab}
          invoice={invoiceData}
          handleCheque={handleCheque}
          cheque={invoiceData.cheque}
          submitData={submitData}
        />
      </div>
    </Fade>
  );
};

export default AddInvoice;
