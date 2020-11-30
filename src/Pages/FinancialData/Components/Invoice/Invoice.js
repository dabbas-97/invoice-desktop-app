import React, { useEffect, useState } from "react";

//react components
import InvoiceTemplate from "./InvoiceTemplate/InvoiceTemplate";
import InvoiceForm from "../Forms/InvoiceForm";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  startLoading,
  stopLoading,
} from "../../../../config/Reducers/loadingSlice";
import { selectCompanyInfo } from "../../../../config/Reducers/companyInfoSlice";
import { selectContractInfo } from "../../../../config/Reducers/contractSlice";
import {
  clearInvoice,
  selectInvoice,
  setInvoice,
} from "../../../../config/Reducers/invoiceSlice";
import { changeView } from "../../../../config/Reducers/financialDataViewSlice";
import {
  openDialog,
  selectDialogIsOpen,
  selectDialogIsSubmitted,
  closeDialog,
} from "../../../../config/Reducers/dialogSlice";
import { selectLink } from "../../../../config/Reducers/authSlice";

import Axios from "axios";

export default function Invoice() {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const invoice = useSelector(selectInvoice);
  const company = useSelector(selectCompanyInfo);
  const contract = useSelector(selectContractInfo);
  const link = useSelector(selectLink);
  useEffect(() => {
    if (!invoice._id) {
      dispatch(startLoading());
      Axios.get(link + "/invoice/count").then(({ data }) => {
        dispatch(setInvoice({ ...invoice, invoiceNumber: data.count + 1 }));
        dispatch(stopLoading());
      });
    }
  }, []);

  const cancel = () => {
    dispatch(changeView(0));
    dispatch(clearInvoice());
    setEditMode(false);
  };
  const proceed = () => {
    dispatch(
      openDialog({
        action: "حفظ",
        title: "حفظ الفاتورة",
        message: "هل تريد حفظ الفاتورة؟",
      })
    );
  };

  const edit = () => {
    setEditMode(true);
  };

  const close = () => {
    dispatch(closeDialog());
    dispatch(changeView(0));
    setEditMode(false);
  };
  const submit = () => {
    if (editMode) {
      Axios.patch(link + "/invoice/" + company._id, invoice).then(() =>
        close()
      );
    } else {
      console.log(company._id);
      Axios.post(link + "/invoice", { ...invoice, _id: company._id }).then(
        () => {
          close();
        }
      );
    }
  };
  const isSubmitted = useSelector(selectDialogIsSubmitted);
  const isDialogOpen = useSelector(selectDialogIsOpen);
  useEffect(() => {
    if (isDialogOpen && isSubmitted) {
      submit();
    }
  }, [isSubmitted, isDialogOpen]);

  const renderInvoice = () => {
    if (invoice._id && !editMode) {
      return (
        <InvoiceTemplate
          invoice={invoice}
          contract={contract}
          company={company}
          back={cancel}
          edit={edit}
        />
      );
    } else {
      return <InvoiceForm cancel={cancel} proceed={proceed} />;
    }
  };

  return <>{loading ? <div>loading ...</div> : <>{renderInvoice()}</>}</>;
}
