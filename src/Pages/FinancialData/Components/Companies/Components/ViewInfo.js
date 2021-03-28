import React from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  changeInvoicesDataView,
  changeReceiptsDataView,
} from "../../../../../config/Reducers/financialDataViewSlice";
import { setInvoice } from "../../../../../config/Reducers/invoiceSlice";
import { setReceipt } from "../../../../../config/Reducers/receiptSlice";
import { selectTab } from "../../../../../config/Reducers/tabSlice";
import { selectLink } from "../../../../../config/Reducers/authSlice";

//Styling
import { AiOutlinePrinter, AiFillEdit } from "react-icons/ai";

import { FaFileInvoice, FaReceipt } from "react-icons/fa";
import { Grid } from "@material-ui/core";
import { FaRegTrashAlt } from "react-icons/fa";
import Axios from "axios";
import {
  startLoading,
  stopLoading,
} from "../../../../../config/Reducers/loadingSlice";

import {
  selectInvoices,
  setInvoices,
} from "../../../../../config/Reducers/invoicesSlice";
import {
  selectReceipts,
  setReceipts,
} from "../../../../../config/Reducers/receiptsSlice";

export const ViewInfo = ({ item, index, editOn }) => {
  const tab = useSelector(selectTab);
  const link = useSelector(selectLink);
  const dispatch = useDispatch();
  const invoices = useSelector(selectInvoices);
  const receipts = useSelector(selectReceipts);

  const showItem = async () => {
    dispatch(startLoading());

    if (tab === 1) {
      dispatch(setInvoice(item));
      dispatch(changeInvoicesDataView(1));
    } else if (tab === 2) {
      dispatch(setReceipt(item));
      dispatch(changeReceiptsDataView(1));
    }
    dispatch(stopLoading());
  };

  const deleteItem = () => {
    if (tab === 1) {
      Axios.delete(`${link}/invoice/${item._id}`).then(() => {
        const toto = invoices.filter((invoice) => invoice._id !== item._id);
        dispatch(setInvoices(toto));
      });
    } else {
      Axios.delete(`${link}/receipt/${item._id}`).then(() => {
        const toto = receipts.filter((receipt) => receipt._id !== item._id);
        dispatch(setReceipts(toto));
      });
    }
  };

  const editItem = () => {
    editOn();

    if (tab === 1) {
      dispatch(setInvoice(item));
      dispatch(changeInvoicesDataView(1));
    } else {
      dispatch(setReceipt(item));
      dispatch(changeReceiptsDataView(1));
    }
  };

  return (
    <Grid container className="invoices_data">
      <Grid item xs={2}>
        {index + 1}
      </Grid>
      <Grid item xs={3}>
        {item.name}
      </Grid>
      <Grid item xs={2}>
        {item.description}
      </Grid>
      <Grid item xs={2}>
        JOD {item.amount}
      </Grid>

      <Grid item xs={1} onClick={() => showItem()} className="invoice_icon">
        <FaFileInvoice />
      </Grid>
      <Grid item xs={1} onClick={() => editItem()} className="invoice_icon">
        <AiFillEdit />
      </Grid>
      <Grid item xs={1} onClick={() => deleteItem()} className="delete_icon">
        <FaRegTrashAlt />
      </Grid>
    </Grid>
  );
};
