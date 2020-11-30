import React, { useEffect, useState } from "react";

//react components
import ReceiptTemplate from "../Receipt/ReceiptTemplate/ReceiptTemplate";
import ReceiptForm from "../Forms/ReceiptForm";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  stopLoading,
  startLoading,
} from "../../../../config/Reducers/loadingSlice";
import { selectCompanyInfo } from "../../../../config/Reducers/companyInfoSlice";
import { selectContractInfo } from "../../../../config/Reducers/contractSlice";
import {
  clearReceipt,
  selectReceipt,
  setReceipt,
} from "../../../../config/Reducers/receiptSlice";
import { changeView } from "../../../../config/Reducers/financialDataViewSlice";
import {
  openDialog,
  selectDialogIsOpen,
  selectDialogIsSubmitted,
  closeDialog,
} from "../../../../config/Reducers/dialogSlice";
import { selectLink } from "../../../../config/Reducers/authSlice";
import Axios from "axios";

export default function Receipt() {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const receipt = useSelector(selectReceipt);
  const company = useSelector(selectCompanyInfo);
  const contract = useSelector(selectContractInfo);
  const link = useSelector(selectLink);

  useEffect(() => {
    if (!receipt._id) {
      dispatch(startLoading());
      Axios.get(link + "/receipt/count").then(({ data }) => {
        dispatch(setReceipt({ ...receipt, receiptNumber: data.count + 1 }));
        dispatch(stopLoading());
      });
    }
  }, []);

  const cancel = () => {
    dispatch(changeView(0));
    dispatch(clearReceipt());
    setEditMode(false);
  };
  const proceed = () => {
    dispatch(
      openDialog({
        action: "حفظ",
        title: "حفظ سند القبض",
        message: "هل تريد حفظ سند القبض؟",
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
      Axios.patch(link + "/receipt/" + company._id, receipt).then(() =>
        close()
      );
    } else {
      console.log(company._id);
      Axios.post(link + "/receipt", { ...receipt, _id: company._id }).then(
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

  const renderReceipt = () => {
    if (receipt._id && !editMode) {
      return (
        <ReceiptTemplate
          company={company}
          receipt={receipt}
          contract={contract}
          back={cancel}
          edit={edit}
        />
      );
    } else {
      return <ReceiptForm cancel={cancel} proceed={proceed} />;
    }
  };

  return <>{loading ? <div>loading ...</div> : <>{renderReceipt()}</>}</>;
}
