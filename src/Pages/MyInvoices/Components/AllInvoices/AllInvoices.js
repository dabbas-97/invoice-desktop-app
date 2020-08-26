import React, { useState } from "react";
import "./AllInvoices.css";
import InvoiceTemplate from "../Templates/InvoiceTemplate/InvoiceTemplate";
import { Grid, Fade, CircularProgress } from "@material-ui/core/";
import { FaFileInvoice } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import ReceiptTemplate from "../Templates/ReceiptTemplate/ReceiptTemplate";
import { CompanyInfoModal } from "../CompanyInfoModal/CompanyInfoModal";
import { ContractModal } from "../ContractModal/ContractModal";
import Moment from "react-moment";

const AllInvoices = ({
  invoiceData,
  editInvoice,
  dialog,
  setDialog,
  loading,
  setDeleteId,
}) => {
  //*showing invoice or receipt details
  const [pageType, setPageType] = useState(0);
  const [invoice, setInvoice] = useState({});

  const getInvoiceTemplate = (id) => {
    const invoice = invoiceData.find((invoice) => invoice._id === id);
    setInvoice(invoice);
    setPageType(1);
  };

  const getReceiptTemplate = (id) => {
    const invoice = invoiceData.find((invoice) => invoice._id === id);
    setInvoice(invoice);
    setPageType(2);
  };
  const backToInvoices = () => {
    setPageType(0);
  };

  //* showing contract details
  const [contractDetails, setContractDetails] = useState("");
  const [showContract, setShowContract] = useState(false);

  const getContractDetails = (id) => {
    const invoice = invoiceData.find((invoice) => invoice._id === id);
    setContractDetails(invoice.contract);
    setShowContract(true);
  };
  //* showing company info
  const [companyInfo, setCompanyInfo] = useState({ name: "coco" });
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  const getCompanyInfo = (id) => {
    const invoice = invoiceData.find((invoice) => invoice._id === id);
    setCompanyInfo(invoice);
    setShowCompanyInfo(true);
  };

  const handleClose = () => {
    setShowContract(false);
    setShowCompanyInfo(false);
  };
  //! Dialog for Deletion

  const deleteInvoice = (id) => {
    setDeleteId(id);
    setDialog({
      action: "حذف",
      title: `حذف فاتورة `,
      message: "سيتم حذف الفاتورة ، هل انت متأكد؟",
      openDialog: true,
      cancel() {
        setDialog({ openDialog: false });
      },
    });
  };
  const renderNumber = (number) => {
    const length = String(number).length;
    switch (length) {
      case 1:
        return "000".concat(number);
      case 2:
        return "00".concat(number);
      case 3:
        return "0".concat(number);
      default:
        return number;
    }
  };
  const fetchInvoices = () => {
    return invoiceData.map((invoice) => (
      <Grid container className="invoices_data" key={invoice._id}>
        <Grid item xs={2}>
          {invoice.name}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getCompanyInfo(invoice._id)}
        >
          <BsBuilding />
        </Grid>
        <Grid item xs={1}>
          <Moment format="YYYY/MM/DD">{invoice.date}</Moment>
        </Grid>
        <Grid item xs={1}>
          {invoice.number}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getContractDetails(invoice._id)}
        >
          <BiReceipt />
        </Grid>
        <Grid item xs={1}>
          {invoice.duration}
        </Grid>
        <Grid item xs={1}>
          {invoice.amountNumbers}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getInvoiceTemplate(invoice._id)}
        >
          <FaFileInvoice />
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getReceiptTemplate(invoice._id)}
        >
          <FaFileInvoice />
        </Grid>
        <Grid
          item
          xs={1}
          className="edit_icon"
          onClick={() => editInvoice(invoice._id)}
        >
          <AiFillEdit />
        </Grid>
        <Grid
          item
          xs={1}
          className="delete_icon"
          onClick={() => deleteInvoice(invoice._id)}
        >
          <AiOutlineDelete />
        </Grid>
      </Grid>
    ));
  };

  const renderPages = () => {
    switch (pageType) {
      default:
        return (
          <Fade in={true} timeout={500}>
            <div className="invoices_container">
              <AllInvoicesTitle />
              {loading ? (
                <div className="empty-section">
                  <CircularProgress className="spinner" />
                </div>
              ) : (
                <div>
                  {invoiceData.length ? (
                    fetchInvoices()
                  ) : (
                    <div className="empty-section">لا يوجد لديك اية فواتير</div>
                  )}
                </div>
              )}
            </div>
          </Fade>
        );
      case 1:
        return (
          <InvoiceTemplate
            invoice={invoice}
            backToInvoices={backToInvoices}
            renderNumber={renderNumber}
          />
        );
      case 2:
        return (
          <ReceiptTemplate
            invoice={invoice}
            backToInvoices={backToInvoices}
            renderNumber={renderNumber}
          />
        );
    }
  };

  return (
    <div>
      {renderPages()}
      <ContractModal
        showContract={showContract}
        handleClose={handleClose}
        contractDetails={contractDetails}
      />
      <CompanyInfoModal
        showCompanyInfo={showCompanyInfo}
        handleClose={handleClose}
        companyInfo={companyInfo}
      />
    </div>
  );
};

export default AllInvoices;

const AllInvoicesTitle = () => {
  return (
    <Grid container className="invoices_title">
      <Grid item xs={2}>
        اسم الشركة
      </Grid>
      <Grid item xs={1}>
        بيانات الشركة
      </Grid>
      <Grid item xs={1}>
        التاريخ
      </Grid>
      <Grid item xs={1}>
        رقم الفاتورة
      </Grid>
      <Grid item xs={1}>
        البيــان
      </Grid>
      <Grid item xs={1}>
        نوع العقد
      </Grid>
      <Grid item xs={1}>
        القيمة
      </Grid>
      <Grid item xs={1}>
        الفاتورة
      </Grid>
      <Grid item xs={1}>
        سند القبض
      </Grid>
      <Grid item xs={1}>
        تعديل
      </Grid>
      <Grid item xs={1}>
        مسح
      </Grid>
    </Grid>
  );
};
