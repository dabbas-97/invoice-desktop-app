import React, { useState } from "react";
import "./AllInvoices.css";
import InvoiceTemplate from "../Templates/InvoiceTemplate/InvoiceTemplate";
import { Grid, Fade } from "@material-ui/core/";
import { FaFileInvoice } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import ReceiptTemplate from "../Templates/ReceiptTemplate/ReceiptTemplate";
import { CompanyInfoModal } from "../CompanyInfoModal/CompanyInfoModal";
import { ContractModal } from "../ContractModal/ContractModal";

const AllInvoices = ({ invoices }) => {
  //*showing invoice or receipt details
  const [pageType, setPageType] = useState(0);
  const [invoice, setInvoice] = useState({});

  const getInvoice = (id) => {
    //TODO: fetch invoice data from database
    setInvoice({
      number: 1334,
      dateCreated: "12/05/2020",
      name: "شركة زين",
      agreementDescription: "عقد من شرطك يبسو سيبب بقيمةو ببي",
      amountWords: "الف دينار لا غير",
      amountNumbers: 1000,
    });
    setPageType(1);
  };

  const getReceipt = (id) => {
    //TODO: fetch receipt data from database
    setInvoice({
      number: 1334,
      dateCreated: "12/05/2020",
      name: "شركة زين",
      agreementDescription: "عقد من شرطك يبسو سيبب بقيمةو ببي",
      payments: [
        {
          type: "دفعة لـ6 شهور",
          amount: 500,
        },
        {
          type: "دفعة لـ6 شهور",
          amount: 500,
        },
      ],
    });
    setPageType(2);
  };
  const backToInvoices = () => {
    setPageType(0);
  };

  //* showing contract details
  const [contractDetails, setContractDetails] = useState("");
  const [showContract, setShowContract] = useState(false);

  const getContractDetails = (id) => {
    //TODO: fetch contract details from database
    setContractDetails("tamer hosny in the house");
    setShowContract(true);
  };
  //* showing company info
  const [companyInfo, setCompanyInfo] = useState({ name: "coco" });
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  const getCompanyInfo = (id) => {
    //TODO: fetch contract details from database
    setCompanyInfo({
      name: "شركة زين",
      location: "الدوار الثامن",
      manager: "مي المؤقت",
      email: "maimpss@zain.com",
      phone: "0794234234",
    });
    setShowCompanyInfo(true);
  };

  const handleClose = () => {
    setShowContract(false);
    setShowCompanyInfo(false);
  };

  const fetchInvoices = () => {
    return invoices.map((invoice) => (
      <Grid container className="invoices_data" key={invoice.id}>
        <Grid item xs={2}>
          {invoice.name}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getCompanyInfo(invoice.id)}
        >
          <BsBuilding />
        </Grid>
        <Grid item xs={1}>
          {invoice.date}
        </Grid>
        <Grid item xs={1}>
          {invoice.number}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getContractDetails(invoice.id)}
        >
          <BiReceipt />
        </Grid>
        <Grid item xs={1}>
          {invoice.contract}
        </Grid>
        <Grid item xs={1}>
          {invoice.amount}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getInvoice(invoice.id)}
        >
          <FaFileInvoice />
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => getReceipt(invoice.id)}
        >
          <FaFileInvoice />
        </Grid>
        <Grid item xs={1} className="edit_icon">
          <AiFillEdit />
        </Grid>
        <Grid item xs={1} className="delete_icon">
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
              {fetchInvoices()}
            </div>
          </Fade>
        );
      case 1:
        return (
          <InvoiceTemplate invoice={invoice} backToInvoices={backToInvoices} />
        );
      case 2:
        return (
          <ReceiptTemplate receipt={invoice} backToInvoices={backToInvoices} />
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
