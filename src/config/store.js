import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./Reducers/tabSlice";
import loadingReducer from "./Reducers/loadingSlice";
import dialogReducer from "./Reducers/dialogSlice";
import financialDataViewReducer from "./Reducers/financialDataViewSlice";
import receiptsReducer from "./Reducers/receiptsSlice";
import invoiceReducer from "./Reducers/invoiceSlice";
import receiptReducer from "./Reducers/receiptSlice";
import invoicesReducer from "./Reducers/invoicesSlice";
import authReducer from "./Reducers/authSlice";

export default configureStore({
  reducer: {
    tab: tabReducer,
    loading: loadingReducer,
    dialog: dialogReducer,
    financialDataView: financialDataViewReducer,
    receipts: receiptsReducer,
    invoice: invoiceReducer,
    receipt: receiptReducer,
    invoices: invoicesReducer,
    auth: authReducer,
  },
});
