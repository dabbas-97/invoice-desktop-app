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
        <Tab label="النظام المالي" />
        <Tab label="إدخال بيانات الشركات" />
      </Tabs>
    </>
  );
};

export default Nav;
