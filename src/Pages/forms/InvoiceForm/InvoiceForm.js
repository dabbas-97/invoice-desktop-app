import React, { useEffect } from "react";
import {
  Fade,
  TextField,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { AiOutlineCheck } from "react-icons/ai";
import { BsReverseBackspaceReverse } from "react-icons/bs";

export const InvoiceForm = ({
  handleInvoice,
  handleCheque,
  invoice,
  proceed,
}) => {
  useEffect(() => {
    console.log(invoice);
  }, [invoice]);
  return (
    <form autoComplete="off" className="add_invoice_form">
      <h3> بيانات الشركة</h3>
      <Grid container direction="row" spacing={4}>
        <Grid container item xs={6}>
          <TextField
            onChange={handleInvoice("name")}
            label="أسم الشركة"
            variant="outlined"
            size="small"
            value={invoice.name}
          />
        </Grid>
        <Grid container item xs={6}>
          <TextField
            onChange={handleInvoice("location")}
            label="العنوان "
            variant="outlined"
            size="small"
            value={invoice.location}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4}>
        <Grid container item xs={4}>
          <TextField
            onChange={handleInvoice("manager")}
            label="مدير الشركة / الشخص المعني"
            variant="outlined"
            size="small"
            value={invoice.manager}
          />
        </Grid>
        <Grid container item xs={4}>
          <TextField
            onChange={handleInvoice("phone")}
            label="هاتف"
            variant="outlined"
            size="small"
            value={invoice.phone}
          />
        </Grid>
        <Grid container item xs={4}>
          <TextField
            onChange={handleInvoice("email")}
            label="البريد الالكتروني"
            variant="outlined"
            size="small"
            value={invoice.email}
          />
        </Grid>
      </Grid>
      <br />
      <h3> العقد</h3>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={6}>
          <TextField
            onChange={handleInvoice("contract")}
            label="البيان"
            variant="outlined"
            size="small"
            value={invoice.contract}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            onChange={handleInvoice("number")}
            label="رقم الفاتورة"
            variant="outlined"
            size="small"
            value={invoice.number}
          />
        </Grid>
        <Grid item xs={4} className="date_picker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="التاريخ"
              value={invoice.date}
              onChange={handleInvoice("date")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
          <TextField
            onChange={handleInvoice("amountWords")}
            label="القيمة"
            variant="outlined"
            size="small"
            value={invoice.amountWords}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            onChange={handleInvoice("amountNumbers")}
            label=" القيمة بالارقام"
            variant="outlined"
            size="small"
            value={invoice.amountNumbers}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField
            onChange={handleInvoice("duration")}
            label="نوع العقد"
            variant="outlined"
            size="small"
            value={invoice.duration}
          />
        </Grid>
        <Grid item xs={3}>
          <RadioGroup
            row
            name="gender1"
            value={invoice.payment}
            onChange={handleInvoice("payment")}
            className="radio-buttons"
          >
            <FormControlLabel
              value="cheque"
              control={<Radio color="primary" />}
              label="شيك"
            />
            <FormControlLabel
              value="cash"
              control={<Radio color="primary" />}
              label="نقد"
            />
          </RadioGroup>
        </Grid>
      </Grid>

      {invoice.payment === "cheque" && (
        <Fade in={true} timeout={500}>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={3}>
              <TextField
                onChange={handleCheque("number")}
                label="رقم الشيك"
                variant="outlined"
                size="small"
                value={invoice.cheque.number}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleCheque("bank")}
                label="البنك"
                variant="outlined"
                size="small"
                value={invoice.cheque.bank}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleCheque("branch")}
                label="فرع"
                variant="outlined"
                size="small"
                value={invoice.cheque.branch}
              />
            </Grid>
            <Grid item xs={3} className="date_picker">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="التاريخ"
                  value={invoice.cheque.date}
                  onChange={handleCheque("date")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Fade>
      )}
      <hr />
      <Grid container direction="row" spacing={4}>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={() => invoice.cancel()}
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
            onClick={() => proceed()}
            className=" btn"
          >
            <span className="btn-icon">
              <AiOutlineCheck />
            </span>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
