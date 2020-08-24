import React from "react";
import Logo from "../../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter } from "react-icons/ai";
import { IconButton, Button, Fade, Grid } from "@material-ui/core";

const InvoiceTemplate = ({ receipt, backToInvoices }) => {
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

        <h3>سند قبض</h3>

        <Grid container spacing={10} className="invoice-info">
          <Grid item xs={4}>
            <div> الرقم: {receipt.number}</div>
          </Grid>
          <Grid item xs={4}>
            <div> </div>
          </Grid>
          <Grid item xs={4}>
            <div> التاريخ : {receipt.dateCreated}</div>
          </Grid>
        </Grid>

        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>وصلنا من السيد/السادة: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {receipt.name}</div>
          </Grid>
        </Grid>

        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>مبـــــلغ وقـــــــدره: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {receipt.amountWords}</div>
          </Grid>
        </Grid>

        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>وذلك عــــــن: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {receipt.agreementDescription}</div>
          </Grid>
        </Grid>
        <Grid container className="big-info">
          <Grid item xs={4}>
            <div>بموجب: </div>
          </Grid>
          <Grid item xs={8}>
            <div className="bold"> {receipt.type}</div>
          </Grid>
        </Grid>
        {!receipt.cheque && (
          <Grid container className="big-info">
            <Grid item xs={3}>
              <div>رقم: </div>
            </Grid>
            <Grid item xs={3}>
              <div> بنك:</div>
            </Grid>
            <Grid item xs={3}>
              <div> فرع:</div>
            </Grid>
            <Grid item xs={3}>
              <div> تاريخ:</div>
            </Grid>
          </Grid>
        )}

        <Grid container className="total-section">
          <Grid item xs={8}>
            <div>القيمة:</div>
          </Grid>

          <Grid item xs={4} className="total-amount">
            <div> {receipt.amountNumbers || 1000} دينار</div>
          </Grid>
        </Grid>

        <Grid container spacing={0} className="small-info">
          <Grid item xs={9}>
            <div>أسم وتوقيع المستلم: </div>
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
