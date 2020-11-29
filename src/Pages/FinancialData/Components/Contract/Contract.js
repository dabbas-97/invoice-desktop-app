import React, { useEffect, useState } from "react";

//react components
import ContractForm from "../Forms/ContractForm";

//redux
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../../../../config/Reducers/loadingSlice";
import { selectCompanyInfo } from "../../../../config/Reducers/companyInfoSlice";
import {
  selectContractInfo,
  setContract,
  clearContract,
} from "../../../../config/Reducers/contractSlice";

import { changeView } from "../../../../config/Reducers/financialDataViewSlice";
import {
  openDialog,
  selectDialogIsOpen,
  selectDialogIsSubmitted,
  closeDialog,
} from "../../../../config/Reducers/dialogSlice";
import { selectLink } from "../../../../config/Reducers/authSlice";

//styling
import { TiBackspaceOutline } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { Grid, IconButton } from "@material-ui/core";
import contractSvg from "../../../../images/contract.svg";

import Axios from "axios";

const Contract = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const company = useSelector(selectCompanyInfo);
  const contract = useSelector(selectContractInfo);
  const link = useSelector(selectLink);
  const cancel = () => {
    dispatch(changeView(0));
    dispatch(clearContract());
    setEditMode(false);
  };
  const proceed = () => {
    dispatch(
      openDialog({
        action: "حفظ",
        title: "حفظ العقد",
        message: "هل تريد حفظ العقد؟",
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
      Axios.patch(link + "/contract/" + company._id, contract).then(() =>
        close()
      );
    } else {
      console.log(company._id);
      Axios.post(link + "/contract", { ...contract, _id: company._id }).then(
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

  const renderContract = () => {
    if (contract._id && !editMode) {
      return <ContractData contract={contract} close={close} edit={edit} />;
    } else {
      return <ContractForm cancel={cancel} proceed={proceed} />;
    }
  };

  return <>{loading ? <div>loading ...</div> : <>{renderContract()}</>}</>;
};
export default Contract;

const ContractData = ({ contract, close, edit }) => {
  return (
    <div className='add_invoice'>
      <IconButton className='back_icon' onClick={() => close()}>
        <TiBackspaceOutline />
      </IconButton>
      <IconButton className='back_icon right-icon' onClick={() => edit()}>
        <AiFillEdit />
      </IconButton>
      <div className='title'>
        <h1>بيانات العقد</h1>
      </div>
      <Grid container direction='row' spacing={4}>
        <Grid item xs={8} className='form-container'>
          <h2>
            البيان: <span>{contract.description}</span>
          </h2>
          <h2>
            المدة: <span>{contract.duration}</span>
          </h2>
        </Grid>
        <Grid item xs={4}>
          <div className='page-logo-svg'>
            <img src={contractSvg} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
