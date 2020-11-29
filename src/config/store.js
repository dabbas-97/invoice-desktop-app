import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./Reducers/tabSlice";
import loadingReducer from "./Reducers/loadingSlice";
import dialogReducer from "./Reducers/dialogSlice";
import financialDataViewReducer from "./Reducers/financialDataViewSlice";
import contractReducer from "./Reducers/contractSlice";
import companyInfoReducer from "./Reducers/companyInfoSlice";
import invoiceReducer from "./Reducers/invoiceSlice";
import receiptReducer from "./Reducers/receiptSlice";
import companiesReducer from "./Reducers/companiesSlice";
import authReducer from "./Reducers/authSlice";

export default configureStore({
  reducer: {
    tab: tabReducer,
    loading: loadingReducer,
    dialog: dialogReducer,
    financialDataView: financialDataViewReducer,
    contract: contractReducer,
    companyInfo: companyInfoReducer,
    invoice: invoiceReducer,
    receipt: receiptReducer,
    companies: companiesReducer,
    auth: authReducer,
  },
});
