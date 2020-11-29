import React, { useState, useEffect } from "react";

import CompanyForm from "../Forms/CompanyForm";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  clearCompanyInfo,
  selectCompanyInfo,
} from "../../../../config/Reducers/companyInfoSlice";
import {
  openDialog,
  closeDialog,
  selectDialogIsOpen,
  selectDialogIsSubmitted,
} from "../../../../config/Reducers/dialogSlice";
import { changeView } from "../../../../config/Reducers/financialDataViewSlice";
import { selectLink } from "../../../../config/Reducers/authSlice";

//Styling
import "./Company.css";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { Grid, IconButton } from "@material-ui/core";
import companySvg from "../../../../images/company.svg";

import Axios from "axios";

const Company = () => {
  const dispatch = useDispatch();
  const company = useSelector(selectCompanyInfo);
  const link = useSelector(selectLink);
  const [editMode, setEditMode] = useState(false);

  const cancel = () => {
    dispatch(changeView(0));
    dispatch(clearCompanyInfo());
    setEditMode(false);
  };
  const edit = () => {
    setEditMode(true);
  };
  const proceed = () => {
    dispatch(
      openDialog({
        action: "حفظ",
        title: "حفظ بيانات الشركة",
        message: "هل تريد حفظ بيانات الشركة",
      })
    );
  };

  const close = () => {
    dispatch(closeDialog());
    dispatch(changeView(0));
    setEditMode(false);
  };
  const submit = () => {
    if (editMode) {
      Axios.patch(link + "/company/" + company._id, company).then(() =>
        close()
      );
    } else {
      Axios.post(link + "/company", company).then(() => {
        close();
      });
    }
  };

  const isSubmitted = useSelector(selectDialogIsSubmitted);
  const isDialogOpen = useSelector(selectDialogIsOpen);

  useEffect(() => {
    if (isDialogOpen && isSubmitted) {
      submit();
    }
  }, [isSubmitted, isDialogOpen]);

  const renderCompany = () => {
    if (company._id && !editMode) {
      return <CompanyData company={company} close={cancel} edit={edit} />;
    } else {
      return <CompanyForm cancel={cancel} proceed={proceed} />;
    }
  };

  return <div>{renderCompany()}</div>;
};
export default Company;

const CompanyData = ({ company, close, edit }) => {
  return (
    <div className='add_invoice'>
      <IconButton className='back_icon' onClick={() => close()}>
        <TiBackspaceOutline />
      </IconButton>
      <IconButton className='back_icon right-icon' onClick={() => edit()}>
        <AiFillEdit />
      </IconButton>
      <div className='title'>
        <h1>بيانات الشركة</h1>
      </div>
      <Grid container direction='row' spacing={4}>
        <Grid item xs={8}>
          <h2>
            اسم الشركة: <span>{company.name}</span>
          </h2>
          <h2>
            العنوان : <span>{company.location}</span>
          </h2>
          <h2>
            هاتف : <span>{company.phoneNumber}</span>
          </h2>
          <h2>
            الشخص المعني: <span>{company.concernedPerson}</span>
          </h2>
          <h2>
            البريد الالكتروني: <span>{company.email}</span>
          </h2>
        </Grid>
        <Grid item xs={4}>
          <div className='page-logo-svg'>
            <img src={companySvg} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
