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

const App = () => {
  const [dialog, setDialog] = useState({
    openDialog: false,
  });
  const [invoiceData, setInvoiceData] = useState({});
  const clearInvoiceData = () => {
    setInvoiceData({
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
      cancel() {
        clearInvoiceData();
        setTab(0);
      },
      confirm() {
        console.log("submited!!");
        clearInvoiceData();
        setTab(1);
      },
    });
  };

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
