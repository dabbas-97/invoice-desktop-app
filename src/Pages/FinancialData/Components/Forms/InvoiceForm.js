import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectInvoice,
  setInvoice,
} from "../../../../config/Reducers/invoiceSlice";
import { selectCompanyInfo } from "../../../../config/Reducers/companyInfoSlice";
import { selectDialogIsSubmitted } from "../../../../config/Reducers/dialogSlice";

//styling
import {
  TextField,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { AiOutlineCheck } from "react-icons/ai";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import invoiceSvg from "../../../../images/invoice.svg";

const InvoiceForm = ({ cancel, proceed }) => {
  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoice);

  const saveInvoice = (e) => {
    e.preventDefault();
    proceed();
  };

  const handleInvoice = (input) => (e) => {
    dispatch(setInvoice({ ...invoice, [input]: e.target.value.trim() }));
  };
  const handleInvoiceCheck = (input) => (e) => {
    dispatch(setInvoice({ ...invoice, [input]: e.target.checked }));
  };
  const handleInvoiceDate = (input) => (e) => {
    dispatch(setInvoice({ ...invoice, [input]: e.toString() }));
  };

  return (
    <form
      autoComplete='off'
      className='add_invoice_form add_invoice'
      onSubmit={saveInvoice}>
      <Grid container direction='row' spacing={4}>
        <Grid item xs={8} className='form-container'>
          <h3> بيانات الفاتورة</h3>
          <div className='form-input-container'>
            <Grid container direction='row' spacing={4}>
              <Grid container item xs={4}>
                <TextField
                  onChange={handleInvoice("invoiceNumber")}
                  label='رقم الفاتورة'
                  variant='outlined'
                  size='small'
                  value={invoice.invoiceNumber}
                />
              </Grid>
              <Grid container item xs={4}>
                <TextField
                  onChange={handleInvoice("amount")}
                  label='القيمة بالارقام '
                  variant='outlined'
                  size='small'
                  value={invoice.amount}
                />
              </Grid>
              <Grid container item xs={4}>
                <TextField
                  onChange={handleInvoice("amountLetters")}
                  label='القيمة بالحروف'
                  variant='outlined'
                  size='small'
                  value={invoice.amountLetters}
                />
              </Grid>
            </Grid>

            <Grid container direction='row' spacing={4}>
              <Grid item xs={8} className='date_picker'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    label='تاريخ الفاتورة'
                    value={new Date(invoice.creationDate)}
                    onChange={handleInvoiceDate("creationDate")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={invoice.includeTax}
                      color='primary'
                      onChange={handleInvoiceCheck("includeTax")}
                    />
                  }
                  label='ضريبة المبيعات'
                />
              </Grid>
            </Grid>
          </div>
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
            <img src={invoiceSvg} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
export default InvoiceForm;
