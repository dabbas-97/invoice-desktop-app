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
        return <MyInvoices setTab={setTab} />;
      case 2:
        return <AddInvoice setTab={setTab} />;
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
