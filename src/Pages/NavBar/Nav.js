import React from "react";
import { Tab, Tabs } from "@material-ui/core";

import "./Nav.css";

const Nav = ({ tab, setTab }) => {
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        className="navbar"
      >
        <Tab label="الرئيسية" />
        <Tab label="الفواتير" />
        <Tab label="إضافة فاتورة جديدة" />
      </Tabs>
    </>
  );
};

export default Nav;
