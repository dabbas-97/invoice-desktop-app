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
import {
  clearReceipt,
  selectReceipt,
  setReceipt,
} from "../../../../config/Reducers/receiptSlice";
import { changeReceiptsDataView } from "../../../../config/Reducers/financialDataViewSlice";
import {
  openDialog,
  selectDialogIsOpen,
  selectDialogIsSubmitted,
  closeDialog,
} from "../../../../config/Reducers/dialogSlice";
import { selectLink } from "../../../../config/Reducers/authSlice";
import Axios from "axios";

export default function Receipt({ editMode, editOn, editOff }) {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const receipt = useSelector(selectReceipt);
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
    dispatch(changeReceiptsDataView(0));
    dispatch(clearReceipt());
    editOff();
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

  const close = () => {
    dispatch(closeDialog());
    dispatch(changeReceiptsDataView(0));
    editOff();
  };

  const submit = () => {
    if (editMode) {
      Axios.patch(link + "/receipt/" + receipt._id, receipt).then(() =>
        close()
      );
    } else {
      console.log(receipt._id);
      Axios.post(link + "/receipt", { ...receipt, _id: receipt._id }).then(
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
        <ReceiptTemplate receipt={receipt} back={cancel} editOn={editOn} />
      );
    } else {
      return <ReceiptForm cancel={cancel} proceed={proceed} />;
    }
  };

  return <>{loading ? <div>loading ...</div> : <>{renderReceipt()}</>}</>;
}
