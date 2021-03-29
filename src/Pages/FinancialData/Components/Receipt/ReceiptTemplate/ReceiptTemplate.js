import React from "react";

//Styling
import "../../Invoice/InvoiceTemplate/Template.css";
import Logo from "../../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter, AiFillEdit } from "react-icons/ai";
import { IconButton, Button, Fade, Grid } from "@material-ui/core";
import Moment from "react-moment";

const ReceiptTemplate = ({ receipt, back, editOn }) => {
  const renderNumber = () => {
    const stringNum = String(receipt.receiptNumber);
    const length = 7 - stringNum.length;
    return new Array(length).fill(0).concat(stringNum);
  };
  return (
    <Fade in={true} timeout={500}>
      <div>
        <div className="invoice-box " id="section-to-print">
          <IconButton className="back_icon" onClick={() => back()}>
            <TiBackspaceOutline />
          </IconButton>
          <IconButton className="back_icon right-icon" onClick={() => editOn()}>
            <AiFillEdit />
          </IconButton>
          <Grid container spacing={6}>
            <Grid item xs={8}>
              <img src={Logo} className="logo" alt="" />
            </Grid>
            <Grid item xs={4} className="small-info">
              <div>مــــــــوقع رؤيـــــــــا نيــــــوز</div>

              <div>شركة صدق الرؤيا الاقتصادي</div>
              <a
                className="roya-link"
                href="https://www.royanews.com"
                target="_blank"
              >
                www.royanews.com
              </a>
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
                  {receipt.amount}
                </span>
              </div>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>

          <Grid container className="invoice-info">
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={6}>
                  الـرقــــــــــــــم:
                </Grid>
                <Grid item xs={6}>
                  {renderNumber()}
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
                التاريخ :
                <Moment format="YYYY/MM/DD">{receipt.creationDate}</Moment>
              </div>
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
                <div className="bold"> {receipt.amountLetters}</div>
              </Grid>
            </Grid>

            <Grid container className="big-info">
              <Grid item xs={4}>
                <div>وذلك عــــــن: </div>
              </Grid>
              <Grid item xs={8}>
                <div className="bold"> {receipt.description}</div>
              </Grid>
            </Grid>
            <Grid container className="big-info">
              <Grid item xs={4}>
                <div>بموجب: </div>
              </Grid>
              <Grid item xs={8}>
                <div className="bold">{receipt.isCheque ? "شيك" : "نقداً"}</div>
              </Grid>
            </Grid>

            {receipt.isCheque === true && (
              <Grid container className="big-info">
                <Grid item xs={3}>
                  <div>رقم: {receipt.cheque.chequeNumber} </div>
                </Grid>
                <Grid item xs={3}>
                  <div> بنك: {receipt.cheque.chequeBank} </div>
                </Grid>
                <Grid item xs={3}>
                  <div> فرع: {receipt.cheque.chequeBankBranch} </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    تاريخ:
                    <Moment format="YYYY/MM/DD">
                      {receipt.cheque.chequeDate}
                    </Moment>
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
                ...................................................................................................{" "}
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
      </div>
    </Fade>
  );
};

export default ReceiptTemplate;
