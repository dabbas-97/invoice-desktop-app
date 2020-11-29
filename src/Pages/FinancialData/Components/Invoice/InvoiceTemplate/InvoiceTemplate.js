import "./Template.css";
import React from "react";
import Logo from "../../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter, AiFillEdit } from "react-icons/ai";
import { IconButton, Button, Fade, Grid } from "@material-ui/core";
import Moment from "react-moment";

const InvoiceTemplate = ({ invoice, back, contract, company, edit }) => {
  const renderNumber = () => {
    const stringNum = String(invoice.invoiceNumber);
    const length = 7 - stringNum.length;
    return new Array(length).fill(0).concat(stringNum);
  };
  return (
    <Fade in={true} timeout={500}>
      <div className='invoice-box ' id='section-to-print'>
        <IconButton className='back_icon' onClick={() => back()}>
          <TiBackspaceOutline />
        </IconButton>
        <IconButton className='back_icon right-icon' onClick={() => edit()}>
          <AiFillEdit />
        </IconButton>
        <Grid container spacing={6}>
          <Grid item xs={8}>
            <img src={Logo} className='logo' alt='' />
          </Grid>
          <Grid item xs={4} className='small-info'>
            <div>مــــــــوقع رؤيـــــــــا نيــــــوز</div>

            <div>شركة صدق الرؤيا الاقتصادي</div>
            <div className='roya-link'>www.royanews.com</div>
          </Grid>
        </Grid>

        <h3>فـــاتـــورة</h3>
        <div className='invoice-info'>
          <Grid container>
            <Grid item xs={4} className='align-right'>
              <Grid container>
                <Grid item xs={6}>
                  رقم الفاتورة:
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
                <Moment format='YYYY/MM/DD'>{invoice.creationDate}</Moment>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className='main-info'>
          <Grid container className='big-info'>
            <Grid item xs={4}>
              <div>المطلوب من السيد/السادة: </div>
            </Grid>
            <Grid item xs={8}>
              <div className='bold'> {company.name}</div>
            </Grid>
          </Grid>

          <Grid container className='big-info'>
            <Grid item xs={4}>
              <div>مبـــــلغ وقـــــــدره: </div>
            </Grid>
            <Grid item xs={8}>
              <div className='bold'> {invoice.amountLetters}</div>
            </Grid>
          </Grid>

          <Grid container className='big-info'>
            <Grid item xs={4}>
              <div>وذلك عــــــن: </div>
            </Grid>
            <Grid item xs={8}>
              <div className='bold'> {contract.description}</div>
            </Grid>
          </Grid>
        </div>
        <Grid container className='invoice-amount'>
          <Grid item xs={8}></Grid>
          <Grid item xs={3}>
            <div>القيـــــــــمة (ديــــــنار):</div>
          </Grid>
          <Grid item xs={1} className='bold'>
            <div>{invoice.amount}</div>
          </Grid>
        </Grid>
        <Grid container className='invoice-amount'>
          <Grid item xs={8}></Grid>
          <Grid item xs={3}>
            <div>ضريـبة المبيعات (16%):</div>
          </Grid>
          <Grid item xs={1} className='bold'>
            <div>
              {Number(Math.round(invoice.amount)) *
                (invoice.includeTax ? 0.16 : 0)}
            </div>
          </Grid>
        </Grid>
        <Grid container className='invoice-amount'>
          <Grid item xs={8}></Grid>
          <Grid item xs={3} className='invoice-total'>
            <div>القيمة الأجمالية (دينار):</div>
          </Grid>
          <Grid item xs={1} className='bold invoice-total'>
            <div>
              {Math.trunc(
                Number(invoice.amount) * (invoice.includeTax ? 0.16 : 0) +
                  Number(invoice.amount)
              )}
            </div>
          </Grid>
        </Grid>

        <Grid container className=' signature'>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <div className='signature-box'>
              <span>التوقيـــع:</span>
              ........................................................................................................{" "}
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={0} className='footer-info'>
          <Grid item xs={12}>
            <div>
              <span>عمان - شارع وصفي التل - مجمع الزامل عمارة رقم 116</span> |
              <span>هاتف 0795237900</span> |
              <span> الايميل info@royanews.com</span>
            </div>
          </Grid>
        </Grid>

        <Button
          variant='outlined'
          size='medium'
          color='primary'
          className='print-btn'
          onClick={() => window.print()}>
          <span className='print-icon'>طبــاعة </span>

          <span className='print-icon'>
            <AiOutlinePrinter />
          </span>
        </Button>
      </div>
    </Fade>
  );
};

export default InvoiceTemplate;
