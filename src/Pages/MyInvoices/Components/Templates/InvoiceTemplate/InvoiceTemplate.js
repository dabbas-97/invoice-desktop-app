import "./InvoiceTemplate.css";
import React from "react";
import Logo from "../../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter } from "react-icons/ai";
import { IconButton, Button, Fade, Grid } from "@material-ui/core";

const InvoiceTemplate = ({ invoice, backToInvoices }) => {
  return (
    <Fade in={true} timeout={500}>
      <div className="invoice-box " id="section-to-print">
        <div className="back_icon">
          <IconButton onClick={() => backToInvoices()}>
            <TiBackspaceOutline />
          </IconButton>
        </div>

        <Grid container spacing={6}>
          <Grid item xs={8}>
            <img src={Logo} className="logo" alt="" />
          </Grid>
          <Grid item xs={4} className="small-info">
            <div>موقع رؤيا نيوز</div>

            <div>Royanews.com</div>
            <div>شركة صدق الرؤيا الاقتصادي</div>
          </Grid>
        </Grid>

        <h3>فـــاتـــورة</h3>

        <Grid container spacing={10} className="invoice-info">
          <Grid item xs={4}>
            <div> رقم الفاتورة : {invoice.number}</div>
          </Grid>
          <Grid item xs={4}>
            <div> </div>
          </Grid>
          <Grid item xs={4}>
            <div> التاريخ : {invoice.dateCreated}</div>
          </Grid>
        </Grid>

        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>المطلوب من السيد/السادة: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {invoice.name}</div>
          </Grid>
        </Grid>

        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>مبـــــلغ وقـــــــدره: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {invoice.amountWords}</div>
          </Grid>
        </Grid>

        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>وذلك عــــــن: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {invoice.agreementDescription}</div>
          </Grid>
        </Grid>

        <Grid container spacing={4} className="total-section">
          <Grid item xs={8}>
            <div>القيمة:</div>
            <div>ضريبة المبيعات (16%):</div>
            <br />
            <div> القيمة الكلية (دينار): </div>
          </Grid>
          <div className="total-amount">
            <Grid item xs={4}>
              <div> {invoice.amountNumbers}</div>
              <div> {invoice.amountNumbers * 0.16}</div>
              <br />
              <div>{invoice.amountNumbers * 0.16 + invoice.amountNumbers}</div>
            </Grid>
          </div>
        </Grid>

        <Grid container spacing={0} className="small-info">
          <Grid item xs={9}>
            <div>التوقيـــع: </div>
          </Grid>
          <Grid item xs={3}>
            <div>شارع وصفي التل</div>
            <div> عمارة رقم 76</div>
            <div> info@royanews.com</div>{" "}
          </Grid>
        </Grid>

        <Button
          variant="outlined"
          size="medium"
          color="primary"
          className="print-btn"
          onClick={() => window.print()}
        >
          <span className="print-icon">طبــاعة </span>

          <span className="print-icon">
            <AiOutlinePrinter />
          </span>
        </Button>
      </div>
    </Fade>
  );
};

export default InvoiceTemplate;
