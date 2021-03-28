import React, { useEffect, useState } from "react";
//react components
import Receipt from "./Components/Receipt/Receipt";
import Receipts from "./Components/Companies/Receipts";

//redux
import { selectReceiptsDataView } from "../../config/Reducers/financialDataViewSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearInvoice } from "../../config/Reducers/invoiceSlice";
import { clearReceipt } from "../../config/Reducers/receiptSlice";

const ReceiptsData = () => {
  const view = useSelector(selectReceiptsDataView);
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
          <Receipt editMode={editMode} editOn={editOn} editOff={editOff} />
        );
      default:
        return (
          <Receipts editMode={editMode} editOn={editOn} editOff={editOff} />
        );
    }
  };

  return <>{renderView()}</>;
};

export default ReceiptsData;
