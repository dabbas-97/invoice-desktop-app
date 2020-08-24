import React, { useState } from "react";
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
  });
  const [chequeData, setChequeData] = useState({
    number: "",
    bank: "",
    branch: "",
    date: new Date(),
  });

  const handleInvoice = (value) => (e) => {
    if (value === "date") {
      setInvoiceData({ ...invoiceData, date: e });
    } else {
      setInvoiceData({ ...invoiceData, [value]: e.target.value });
    }
  };
  const handleCheque = (value) => (e) => {
    if (value === "date") {
      setChequeData({ ...chequeData, date: e });
    } else {
      setChequeData({ ...chequeData, [value]: e.target.value });
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
          cheque={chequeData}
          submitData={submitData}
        />
      </div>
    </Fade>
  );
};

export default AddInvoice;
