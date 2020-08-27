import React, { useState } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Components
import Nav from "./Pages/NavBar/Nav";
import Home from "./Pages/Home/Home";
import MyInvoices from "./Pages/MyInvoices/MyInvoices";
import AddInvoice from "./Pages/AddInvoice/AddInvoice";
import Rtl from "./config/Rtl";
// End of Components

import axios from "axios";

const App = () => {
  const [dialog, setDialog] = useState({
    openDialog: false,
  });
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const clearInvoiceData = (number = 0) => {
    setInvoiceData({
      id: "",
      name: "",
      location: "",
      manager: "",
      phone: "",
      email: "",
      contract: "",
      number, // get invoices numbers +1
      date: new Date(),
      receiptDate: new Date(),
      tax: false,
      duration: "",
      amountNumbers: "",
      amountWords: "",
      payment: "cheque",
      cheque: {
        number: "",
        bank: "",
        branch: "",
        fillDate: false,
        date: new Date(),
      },

      cancel() {
        clearInvoiceData();
        setTab(0);
      },
    });
  };

  const postInvoice = () => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/invoices/api/", {
        name: invoiceData.name,
        location: invoiceData.location,
        manager: invoiceData.manager,
        phone: invoiceData.phone,
        email: invoiceData.email,
        duration: invoiceData.duration,
        contract: invoiceData.contract,
        number: invoiceData.number,
        date: invoiceData.date,
        receiptDate: invoiceData.receiptDate,
        tax: invoiceData.tax,
        amountNumbers: invoiceData.amountNumbers,
        amountWords: invoiceData.amountWords,
        payment: invoiceData.payment,
        cheque: {
          number: invoiceData.cheque.number,
          bank: invoiceData.cheque.bank,
          branch: invoiceData.cheque.branch,
          fillDate: invoiceData.cheque.fillDate,
          date: invoiceData.cheque.date,
        },
      })
      .then(() => {
        setLoading(false);
        clearInvoiceData();
        setTab(1);
        setDialog({ openDialog: false });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        clearInvoiceData();
        setTab(1);
        setDialog({ openDialog: false });
      });
  };

  const handleInvoice = (value) => (e) => {
    if (value === "date" || value === "receiptDate") {
      setInvoiceData({ ...invoiceData, [value]: e });
    } else if (value === "tax") {
      setInvoiceData({ ...invoiceData, tax: e.target.checked });
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
    } else if (value === "fillDate") {
      setInvoiceData({
        ...invoiceData,
        cheque: { ...invoiceData.cheque, fillDate: e.target.checked },
      });
    } else {
      setInvoiceData({
        ...invoiceData,
        cheque: { ...invoiceData.cheque, [value]: e.target.value },
      });
    }
  };

  const theme = createMuiTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Tabs
  const [tab, setTab] = useState(0);
  const renderPages = () => {
    switch (tab) {
      case 0:
        return <Home setTab={setTab} />;
      case 1:
        return (
          <MyInvoices
            setTab={setTab}
            handleInvoice={handleInvoice}
            handleCheque={handleCheque}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            clearInvoiceData={clearInvoiceData}
            dialog={dialog}
            setDialog={setDialog}
          />
        );
      case 2:
        return (
          <AddInvoice
            setTab={setTab}
            handleInvoice={handleInvoice}
            handleCheque={handleCheque}
            invoiceData={invoiceData}
            clearInvoiceData={clearInvoiceData}
            dialog={dialog}
            setDialog={setDialog}
            loading={loading}
            setLoading={setLoading}
            postInvoice={postInvoice}
          />
        );
      default:
        return <Home setTab={setTab} />;
    }
  };
  // End of Tabs

  return (
    <Rtl>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Nav tab={tab} setTab={setTab} />
          {renderPages()}
        </Container>
      </ThemeProvider>
    </Rtl>
  );
};

export default App;
