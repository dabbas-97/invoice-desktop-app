import React from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectReceipt,
  setReceipt,
} from "../../../../config/Reducers/receiptSlice";
import { selectReceipts } from "../../../../config/Reducers/receiptsSlice";

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
import receiptSvg from "../../../../images/receipt.svg";

const ReceiptForm = ({ cancel, proceed }) => {
  const dispatch = useDispatch();
  const receipt = useSelector(selectReceipt);

  const saveReceipt = (e) => {
    e.preventDefault();
    proceed();
  };

  const handleReceipt = (input) => (e) => {
    if (input.startsWith("cheque")) {
      dispatch(
        setReceipt({
          ...receipt,
          cheque: { ...receipt.cheque, [input]: e.target.value },
        })
      );
    } else {
      dispatch(setReceipt({ ...receipt, [input]: e.target.value }));
    }
  };
  const handleReceiptCheck = (input) => (e) => {
    if (input.startsWith("cheque")) {
      dispatch(
        setReceipt({
          ...receipt,
          cheque: { ...receipt.cheque, [input]: e.target.checked },
        })
      );
    } else {
      dispatch(setReceipt({ ...receipt, [input]: e.target.checked }));
    }
  };
  const handleReceiptDate = (input) => (e) => {
    if (input.startsWith("cheque")) {
      dispatch(
        setReceipt({
          ...receipt,
          cheque: { ...receipt.cheque, [input]: e.toString() },
        })
      );
    } else {
      dispatch(setReceipt({ ...receipt, [input]: e.toString() }));
    }
  };

  return (
    <form
      autoComplete="off"
      className="add_invoice_form add_invoice"
      onSubmit={saveReceipt}
    >
      <Grid container direction="row" spacing={4}>
        <Grid item xs={8} className="form-container">
          <h3> بيانات الشركة</h3>
          <Grid container direction="row" spacing={4}>
            <Grid container item xs={6}>
              <TextField
                onChange={handleReceipt("name")}
                label="أسم الشركة"
                variant="outlined"
                size="small"
                value={receipt.name}
              />
            </Grid>
            <Grid container item xs={6}>
              <TextField
                onChange={handleReceipt("location")}
                label="العنوان "
                variant="outlined"
                size="small"
                value={receipt.location}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={4}>
            <Grid container item xs={4}>
              <TextField
                onChange={handleReceipt("concernedPerson")}
                label="مدير الشركة / الشخص المعني"
                variant="outlined"
                size="small"
                value={receipt.concernedPerson}
              />
            </Grid>
            <Grid container item xs={4}>
              <TextField
                onChange={handleReceipt("phoneNumber")}
                label="هاتف"
                variant="outlined"
                size="small"
                value={receipt.phoneNumber}
              />
            </Grid>
            <Grid container item xs={4}>
              <TextField
                onChange={handleReceipt("email")}
                label="البريد الالكتروني"
                variant="outlined"
                size="small"
                value={receipt.email}
              />
            </Grid>
          </Grid>
          <h3> بيانات العقد</h3>
          <div className="form-input-container">
            <Grid container direction="row" spacing={4}>
              <Grid container item xs={6}>
                <TextField
                  onChange={handleReceipt("description")}
                  label="البيان"
                  variant="outlined"
                  size="small"
                  value={receipt.description}
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  onChange={handleReceipt("duration")}
                  label="المدة"
                  variant="outlined"
                  size="small"
                  value={receipt.duration}
                />
              </Grid>
            </Grid>
          </div>
          <h3> بيانات سند القبض</h3>
          <div className="form-input-container">
            <Grid container direction="row" spacing={4}>
              <Grid container item xs={4}>
                <TextField
                  onChange={handleReceipt("receiptNumber")}
                  label="رقم سند القبض"
                  variant="outlined"
                  size="small"
                  value={receipt.receiptNumber}
                />
              </Grid>
              <Grid container item xs={4}>
                <TextField
                  onChange={handleReceipt("amount")}
                  label="القيمة بالارقام "
                  variant="outlined"
                  size="small"
                  value={receipt.amount}
                />
              </Grid>
              <Grid container item xs={4}>
                <TextField
                  onChange={handleReceipt("amountLetters")}
                  label="القيمة بالحروف"
                  variant="outlined"
                  size="small"
                  value={receipt.amountLetters}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" spacing={4}>
              <Grid item xs={8} className="date_picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="تاريخ سند القبض"
                    value={new Date(receipt.creationDate)}
                    onChange={handleReceiptDate("creationDate")}
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
                      checked={receipt.isCheque}
                      color="primary"
                      onChange={handleReceiptCheck("isCheque")}
                    />
                  }
                  label="شيك"
                />
              </Grid>
            </Grid>
            {receipt.isCheque === true && (
              <Grid container direction="row" spacing={4}>
                <Grid container item xs={3}>
                  <TextField
                    onChange={handleReceipt("chequeNumber")}
                    label="رقم الشيك"
                    variant="outlined"
                    size="small"
                    value={receipt.cheque.chequeNumber}
                  />
                </Grid>
                <Grid container item xs={3}>
                  <TextField
                    onChange={handleReceipt("chequeBank")}
                    label="البنك"
                    variant="outlined"
                    size="small"
                    value={receipt.cheque.chequeBank}
                  />
                </Grid>
                <Grid container item xs={3}>
                  <TextField
                    onChange={handleReceipt("chequeBankBranch")}
                    label="الفرع"
                    variant="outlined"
                    size="small"
                    value={receipt.cheque.chequeBankBranch}
                  />
                </Grid>
                <Grid container item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      label="تاريخ الشيك"
                      value={new Date(receipt.cheque.chequeDate)}
                      onChange={handleReceiptDate("chequeDate")}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            )}
          </div>
          <hr />
          <Grid container direction="row" spacing={4}>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={() => cancel()}
                className="cancel-btn btn"
              >
                <span className="btn-icon">
                  <BsReverseBackspaceReverse />
                </span>
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                type="submit"
                onClick={() => proceed()}
                className=" btn"
              >
                <span className="btn-icon">
                  <AiOutlineCheck />
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div className="page-logo-svg">
            <img src={receiptSvg} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
export default ReceiptForm;
