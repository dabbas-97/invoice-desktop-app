import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { moveToTab, selectTab } from "../../config/Reducers/tabSlice";

import { Tab, Tabs } from "@material-ui/core";
import { IoMdStats, IoMdPaper } from "react-icons/io";
import { FaFileContract } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

import "./Nav.css";
import {
  changeInvoicesDataView,
  changeReceiptsDataView,
} from "../../config/Reducers/financialDataViewSlice";
import { clearInvoice } from "../../config/Reducers/invoiceSlice";
import { clearReceipt } from "../../config/Reducers/receiptSlice";

const Nav = () => {
  const tab = useSelector(selectTab);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(changeInvoicesDataView(0));
    dispatch(changeReceiptsDataView(0));
    dispatch(moveToTab(value));
    dispatch(clearInvoice());
    dispatch(clearReceipt());
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
        <Tab label={<IoMdStats />} />
        <Tab label={<FaFileContract />} />
        <Tab label={<IoMdPaper />} />
        <Tab label={<FiImage />} />
      </Tabs>
    </>
  );
};

export default Nav;
