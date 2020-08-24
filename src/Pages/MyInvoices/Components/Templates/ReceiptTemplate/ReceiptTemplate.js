import React from "react";
import Logo from "../../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter } from "react-icons/ai";
import { IconButton, Button, Fade, Grid } from "@material-ui/core";

const InvoiceTemplate = ({ receipt, backToInvoices }) => {
  return (
    <Fade in={true} timeout={500}>
      <div className="invoice-box " id="section-to-print">
        <IconButton className="back_icon" onClick={() => backToInvoices()}>
          <TiBackspaceOutline />
        </IconButton>

        <Grid container spacing={6}>
          <Grid item xs={8}>
            <img src={Logo} className="logo" alt="" />
          </Grid>
          <Grid item xs={4} className="small-info">
            <div>مــــــــوقع رؤيـــــــــا نيــــــوز</div>

            <div>شركة صدق الرؤيا الاقتصادي</div>
            <div className="roya-link">www.Royanews.com</div>
          </Grid>
        </Grid>

        <h3>سند قبــض</h3>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className="center">
              <span className="inline-block">فلس</span>
              <span className="inline-block">دينار</span>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className="center">
              {" "}
              <span className="inline-block receipt-amount">
                {receipt.amountNumbers || "000"}
              </span>
              <span className="inline-block receipt-amount">
                {receipt.amountNumbers || 1000}
              </span>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>

        <Grid container spacing={10} className="invoice-info">
          <Grid item xs={4}>
            <div> الرقم: {receipt.number}</div>
            <div> الرقم الضريبي: 123124</div>
          </Grid>
          <Grid item xs={4}>
            <div> </div>
          </Grid>
          <Grid item xs={4}>
            <div> التاريخ : {receipt.dateCreated}</div>
          </Grid>
        </Grid>
        <div className="main-info">
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
        </div>
        <Grid container spacing={0} className="signature">
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <div>أسم وتوقيع المستلم: </div>
          </Grid>
        </Grid>
        <Grid container spacing={0} className="footer-info">
          <Grid item xs={12}>
            <div>
              <span>عمان - شارع وصفي التل - مجمع الزامل عمارة رقم 116</span> |
              <span>هاتف 0795237900</span> |
              <span> الايميل info@royanews.com</span>
            </div>
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
