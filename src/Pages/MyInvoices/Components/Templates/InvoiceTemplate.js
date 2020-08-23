import "./InvoiceTemplate.css";
import React from "react";
import Logo from "../../../../images/logo.jpg";
import { TiBackspaceOutline } from "react-icons/ti";
import { AiOutlinePrinter } from "react-icons/ai";
import { IconButton, Button, Fade } from "@material-ui/core";

const InvoiceTemplate = ({ invoice, closeInvoice }) => {
  return (
    <>
      <Fade in={true} timeout={500}>
        <div>
          <div className="invoice-box rtl" id="section-to-print">
            <div className="back_icon">
              <IconButton aria-label="delete" onClick={() => closeInvoice()}>
                <TiBackspaceOutline />
              </IconButton>
            </div>

            <table cellPadding="0" cellSpacing="0">
              <tbody className="top">
                <td colspan="2">
                  <table>
                    <tbody>
                      <td>
                        رقم الفاتورة : {invoice.number}
                        <br />
                        التاريخ : {invoice.dateCreated}
                      </td>
                      <td className="title ">
                        <img src={Logo} className="logo" alt="" />
                      </td>
                    </tbody>
                  </table>
                </td>
              </tbody>

              <tbody className="information">
                <td colspan="2">
                  <table>
                    <tbody>
                      <td>
                        شركة صدق الرؤيا الاقتصادي
                        <br />
                        شارع وصفي التل
                        <br />
                        عمارة رقم 76
                      </td>

                      <td>
                        شركة محمود وحمزة الدباس
                        <br />
                        <br />
                        info@royanews.com
                      </td>
                    </tbody>
                  </table>
                </td>
              </tbody>

              <tbody className="heading">
                <td>الطرف الثاني</td>

                <td>البيــان </td>
              </tbody>

              <tbody className="details">
                <td>{invoice.secondParty}</td>
                <td>{invoice.agreementDescription}</td>
              </tbody>

              <tbody className="heading">
                <td> العقد</td>

                <td>القيمة</td>
              </tbody>

              {invoice.payments.map((payment) => (
                <tbody className="item" key={payment.type + Math.random()}>
                  <td>{payment.type}</td>

                  <td> {payment.amount} JD</td>
                </tbody>
              ))}

              <tbody className="item">
                <td> الضريبة (%16):</td>

                <td>
                  {invoice.payments.reduce((a, b) => a + b.amount * 0.16, 0)} JD
                </td>
              </tbody>

              <tbody className="total">
                <td className="td">السعر الاجمالي:</td>

                <td>
                  JD{" "}
                  {invoice.payments.reduce(
                    (a, b) => a + b.amount + b.amount * 0.16,
                    0
                  )}
                </td>
              </tbody>
            </table>
          </div>
          <div className="print-btn">
            <Button
              variant="outlined"
              size="medium"
              color="primary"
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
    </>
  );
};

export default InvoiceTemplate;
