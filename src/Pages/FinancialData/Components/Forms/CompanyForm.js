import React from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectCompanyInfo,
  setCompanyInfo,
  clearCompanyInfo,
} from "../../../../config/Reducers/companyInfoSlice";

//Styling
import { TextField, Grid, Button } from "@material-ui/core";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import companySvg from "../../../../images/company.svg";

export default function CompanyForm({ cancel, proceed }) {
  const dispatch = useDispatch();
  const companyInfo = useSelector(selectCompanyInfo);

  const handleCompanyInfo = (input) => (e) => {
    dispatch(
      setCompanyInfo({ ...companyInfo, [input]: e.target.value.trim() })
    );
  };

  const addCompany = (e) => {
    console.log("submitted!!");
    e.preventDefault();
    proceed();
  };
  return (
    <form
      autoComplete='off'
      className='add_invoice_form add_invoice'
      onSubmit={addCompany}>
      <Grid container direction='row' spacing={4}>
        <Grid item xs={8}>
          <h3> بيانات الشركة</h3>
          <Grid container direction='row' spacing={4}>
            <Grid container item xs={6}>
              <TextField
                onChange={handleCompanyInfo("name")}
                label='أسم الشركة'
                variant='outlined'
                size='small'
                value={companyInfo.name}
              />
            </Grid>
            <Grid container item xs={6}>
              <TextField
                onChange={handleCompanyInfo("location")}
                label='العنوان '
                variant='outlined'
                size='small'
                value={companyInfo.location}
              />
            </Grid>
          </Grid>
          <Grid container direction='row' spacing={4}>
            <Grid container item xs={4}>
              <TextField
                onChange={handleCompanyInfo("concernedPerson")}
                label='مدير الشركة / الشخص المعني'
                variant='outlined'
                size='small'
                value={companyInfo.concernedPerson}
              />
            </Grid>
            <Grid container item xs={4}>
              <TextField
                onChange={handleCompanyInfo("phoneNumber")}
                label='هاتف'
                variant='outlined'
                size='small'
                value={companyInfo.phoneNumber}
              />
            </Grid>
            <Grid container item xs={4}>
              <TextField
                onChange={handleCompanyInfo("email")}
                label='البريد الالكتروني'
                variant='outlined'
                size='small'
                value={companyInfo.email}
              />
            </Grid>
          </Grid>
          <hr />
          <Grid container direction='row' spacing={4}>
            <Grid item xs={2}>
              <Button
                variant='outlined'
                size='medium'
                color='primary'
                onClick={() => cancel()}
                className='cancel-btn btn'>
                <span className='btn-icon'>
                  <BsReverseBackspaceReverse />
                </span>
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Button
                variant='outlined'
                size='medium'
                color='primary'
                type='submit'
                onClick={() => proceed()}
                className=' btn'>
                <span className='btn-icon'>
                  <AiOutlineCheck />
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div className='page-logo-svg'>
            <img src={companySvg} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
