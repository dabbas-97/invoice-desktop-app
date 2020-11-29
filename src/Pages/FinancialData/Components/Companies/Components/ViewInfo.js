import React from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../../../../config/Reducers/financialDataViewSlice";
import { setInvoice } from "../../../../../config/Reducers/invoiceSlice";
import { setReceipt } from "../../../../../config/Reducers/receiptSlice";
import {
  setContract,
  selectContractInfo,
} from "../../../../../config/Reducers/contractSlice";
import { setCompanyInfo } from "../../../../../config/Reducers/companyInfoSlice";
import { selectLink } from "../../../../../config/Reducers/authSlice";

//Styling
import { IoMdPaper } from "react-icons/io";
import { FaFileInvoice, FaReceipt } from "react-icons/fa";
import { Grid } from "@material-ui/core";
import { FaRegTrashAlt } from "react-icons/fa";
import Axios from "axios";
import {
  startLoading,
  stopLoading,
} from "../../../../../config/Reducers/loadingSlice";
import {
  selectCompanies,
  setCompanies,
} from "../../../../../config/Reducers/companiesSlice";

export const ViewInfo = ({ company, index }) => {
  const companies = useSelector(selectCompanies);
  const link = useSelector(selectLink);
  const dispatch = useDispatch();

  const showInvoice = async () => {
    dispatch(setCompanyInfo(company));
    dispatch(startLoading());
    const contract = await Axios.get(`${link}/contract/${company._id}`);
    if (contract.data) {
      dispatch(setContract(contract.data));
    }
    const invoice = await Axios.get(`${link}/invoice/${company._id}`);
    if (invoice.data) {
      dispatch(setInvoice(invoice.data));
    }
    dispatch(stopLoading());
    dispatch(changeView(1));
  };

  const showReceipt = async () => {
    dispatch(setCompanyInfo(company));
    dispatch(startLoading());
    const contract = await Axios.get(`${link}/contract/${company._id}`);
    console.log(contract.data);
    if (contract.data) {
      dispatch(setContract(contract.data));
    }
    const receipt = await Axios.get(`${link}/receipt/${company._id}`);
    if (receipt.data) {
      dispatch(setReceipt(receipt.data));
    }
    dispatch(stopLoading());
    dispatch(changeView(2));
  };
  const showContract = () => {
    dispatch(setCompanyInfo(company));
    dispatch(startLoading());
    Axios.get(`${link}/contract/${company._id}`).then(({ data }) => {
      if (data) {
        dispatch(setContract(data));
      }
      dispatch(stopLoading());
      dispatch(changeView(3));
    });
  };

  const showCompanyInfo = () => {
    dispatch(setCompanyInfo(company));
    dispatch(changeView(4));
  };

  const deleteCompany = () => {
    Axios.delete(`${link}/company/${company._id}`).then(({ data }) => {
      console.log(data);
      const toto = companies.filter((company) => company._id !== data);
      dispatch(setCompanies(toto));
    });
  };
  return (
    <Grid container className='invoices_data'>
      <Grid item xs={2}>
        {index + 1}
      </Grid>
      <Grid
        item
        xs={3}
        onClick={() => showCompanyInfo()}
        className='invoice_icon'>
        {company.name}
      </Grid>
      <Grid item xs={2} onClick={() => showContract()} className='invoice_icon'>
        <IoMdPaper />
      </Grid>
      <Grid item xs={2} onClick={() => showInvoice()} className='invoice_icon'>
        <FaFileInvoice />
      </Grid>
      <Grid item xs={2} onClick={() => showReceipt()} className='invoice_icon'>
        <FaReceipt />
      </Grid>
      <Grid item xs={1} onClick={() => deleteCompany()} className='delete_icon'>
        <FaRegTrashAlt />
      </Grid>
    </Grid>
  );
};
