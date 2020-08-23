import React, { useState, useEffect } from "react";
import "./AddInvoice.css";
import { Fade, TextField, Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const AddInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    name: "",
    number: 0,
    date: new Date(),
  });

  useEffect(() => {
    console.log(invoiceData);
  }, [invoiceData]);

  const handleChange = (value) => (e) => {
    if (value === "date") {
      setInvoiceData({ ...invoiceData, date: e });
    } else {
      setInvoiceData({ ...invoiceData, [value]: e.target.value });
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <div className="add_invoice">
        <InvoiceForm handleChange={handleChange} date={invoiceData.date} />
      </div>
    </Fade>
  );
};

export default AddInvoice;

const InvoiceForm = ({ handleChange, date }) => {
  return (
    <form autoComplete="off" className="add_invoice_form">
      <h3> بيانات الشركة</h3>
      <Grid container direction="row" spacing={4}>
        <Grid container item xs={6}>
          <TextField
            onChange={handleChange("name")}
            label="أسم الشركة"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={6}>
          <TextField
            onChange={handleChange("name")}
            label="العنوان "
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4}>
        <Grid container item xs={4}>
          <TextField
            onChange={handleChange("name")}
            label="مدير الشركة / الشخص المعني"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={4}>
          <TextField
            onChange={handleChange("name")}
            label="هاتف"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={4}>
          <TextField
            onChange={handleChange("name")}
            label="البريد الالكتروني"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <br />
      <h3> العقد</h3>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={8}>
          <TextField
            onChange={handleChange("name")}
            label="البيان"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="التاريخ"
              value={date}
              onChange={handleChange("date")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={6}>
          <TextField
            onChange={handleChange("name")}
            label="القيمة"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={handleChange("name")}
            label="المدة"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </form>
  );
};
