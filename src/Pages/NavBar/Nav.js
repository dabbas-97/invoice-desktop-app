import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { moveToTab, selectTab } from "../../config/Reducers/tabSlice";

import { Tab, Tabs } from "@material-ui/core";
import { IoMdStats } from "react-icons/io";
import { FaFileContract } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

import "./Nav.css";
import { changeView } from "../../config/Reducers/financialDataViewSlice";
import { clearCompanyInfo } from "../../config/Reducers/companyInfoSlice";
import { clearInvoice } from "../../config/Reducers/invoiceSlice";
import { clearContract } from "../../config/Reducers/contractSlice";
import { clearReceipt } from "../../config/Reducers/receiptSlice";

const Nav = () => {
  const tab = useSelector(selectTab);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(changeView(0));
    dispatch(moveToTab(value));
    dispatch(clearCompanyInfo());
    dispatch(clearInvoice());
    dispatch(clearContract());
    dispatch(clearReceipt());
  };
  return (
    <>
      <Tabs
        value={tab}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        className='navbar'>
        <Tab label={<IoMdStats />} />
        <Tab label={<FaFileContract />} />
        <Tab label={<FiImage />} />
      </Tabs>
    </>
  );
};

export default Nav;
