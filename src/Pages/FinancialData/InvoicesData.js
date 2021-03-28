import React, { useEffect, useState } from "react";
//react components
import Invoice from "./Components/Invoice/Invoice";
import Invoices from "./Components/Companies/Invoices";

//redux
import { selectInvoicesDataView } from "../../config/Reducers/financialDataViewSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearInvoice } from "../../config/Reducers/invoiceSlice";
import { clearReceipt } from "../../config/Reducers/receiptSlice";

const InvoicesData = () => {
  const view = useSelector(selectInvoicesDataView);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view === 0) {
      dispatch(clearInvoice());
      dispatch(clearReceipt());
    }
  }, [view]);

  const editOn = () => {
    setEditMode(true);
  };
  const editOff = () => {
    setEditMode(false);
  };

  const renderView = () => {
    switch (view) {
      case 1:
        return (
          <Invoice editMode={editMode} editOn={editOn} editOff={editOff} />
        );
      default:
        return (
          <Invoices editMode={editMode} editOn={editOn} editOff={editOff} />
        );
    }
  };

  return <>{renderView()}</>;
};

export default InvoicesData;
