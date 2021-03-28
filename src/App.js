import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { selectTab } from "./config/Reducers/tabSlice";

//Themes

import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Components
import Nav from "./Pages/NavBar/Nav";
import Statistics from "./Pages/Statistics/Statistics";
import CompressImage from "./Pages/CompressImage/CompressImage";
import Rtl from "./config/Rtl";
// End of Components

import { ProceedDialog } from "./Pages/Dialog/ProceedDialog";
import InvoicesData from "./Pages/FinancialData/InvoicesData";
import ReceiptsData from "./Pages/FinancialData/ReceiptsData";

const App = () => {
  const theme = createMuiTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  const tab = useSelector(selectTab);

  // Tabs
  const renderPages = () => {
    switch (tab) {
      case 1:
        return <InvoicesData />;
      case 2:
        return <ReceiptsData />;
      case 3:
        return <CompressImage />;
      default:
        return <Statistics />;
    }
  };
  // End of Tabs

  return (
    <Rtl>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Nav />
          {renderPages()}
        </div>
        <ProceedDialog />
      </ThemeProvider>
    </Rtl>
  );
};

export default App;
