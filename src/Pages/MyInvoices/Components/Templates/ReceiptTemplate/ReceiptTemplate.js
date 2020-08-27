import React from "react";
import Logo from "../../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter } from "react-icons/ai";
import { IconButton, Button, Fade, Grid } from "@material-ui/core";
import Moment from "react-moment";

const ReceiptTemplate = ({ invoice, backToInvoices, renderNumber }) => {
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
            <div className="roya-link">www.royanews.com</div>
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
              <span className="inline-block receipt-amount">{"000"}</span>
              <span className="inline-block receipt-amount">
                {invoice.amountNumbers}
              </span>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>

        <Grid container spacing={6} className="invoice-info">
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={6}>
                الـــــــرقم:
              </Grid>
              <Grid item xs={6}>
                {renderNumber(invoice.number)}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                الرقم الضريبي:
              </Grid>
              <Grid item xs={6}>
                17195551
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <div> </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Moment format="YYYY/MM/DD">{invoice.receiptDate}</Moment>
            </div>
          </Grid>
        </Grid>
        <div className="main-info">
          <Grid container className="big-info">
            <Grid item xs={4}>
              <div>وصلنا من السيد/السادة: </div>
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
              <div className="bold"> {invoice.contract}</div>
            </Grid>
          </Grid>
          <Grid container className="big-info">
            <Grid item xs={4}>
              <div>بموجب: </div>
            </Grid>
            <Grid item xs={8}>
              <div className="bold">
                {invoice.payment === "cheque" ? "شيك" : "نقداً"}
              </div>
            </Grid>
          </Grid>

          {invoice.payment === "cheque" && (
            <Grid container className="big-info">
              <Grid item xs={3}>
                <div>رقم: {invoice.cheque.number} </div>
              </Grid>
              <Grid item xs={3}>
                <div> بنك: {invoice.cheque.bank} </div>
              </Grid>
              <Grid item xs={3}>
                <div> فرع: {invoice.cheque.branch} </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  تاريخ:{" "}
                  {invoice.cheque.fillDate || (
                    <Moment format="YYYY/MM/DD">{invoice.cheque.date}</Moment>
                  )}
                </div>
              </Grid>
            </Grid>
          )}
        </div>
        <Grid container spacing={0} className="signature">
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <div className="signature-box">
              <span>أسم وتوقيع المستلم:</span>
              ......................................................................................................{" "}
            </div>
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

export default ReceiptTemplate;
