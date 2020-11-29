import React, { useEffect } from "react";
//react components
import Invoice from "./Components/Invoice/Invoice";
import Receipt from "./Components/Receipt/Receipt";
import Companies from "./Components/Companies/Companies";
import Company from "./Components/Company/Company";
import Contract from "./Components/Contract/Contract";

//redux
import { selectFinancialDataView } from "../../config/Reducers/financialDataViewSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCompanyInfo } from "../../config/Reducers/companyInfoSlice";
import { clearInvoice } from "../../config/Reducers/invoiceSlice";
import { clearReceipt } from "../../config/Reducers/receiptSlice";
import { clearContract } from "../../config/Reducers/contractSlice";

const FinancialData = () => {
  const view = useSelector(selectFinancialDataView);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view === 0) {
      dispatch(clearCompanyInfo());
      dispatch(clearInvoice());
      dispatch(clearContract());
      dispatch(clearReceipt());
    }
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 1:
        return <Invoice />;
      case 2:
        return <Receipt />;
      case 3:
        return <Contract />;
      case 4:
        return <Company />;
      default:
        return <Companies />;
    }
  };

  return <>{renderView()}</>;
};

export default FinancialData;
