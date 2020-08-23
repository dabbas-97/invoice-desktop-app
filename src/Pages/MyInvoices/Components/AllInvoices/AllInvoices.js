import React, { useState } from "react";
import "./AllInvoices.css";
import InvoiceTemplate from "../Templates/InvoiceTemplate";
import { Grid, Modal, Fade } from "@material-ui/core/";
import { FaFileInvoice } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

const AllInvoices = ({ invoices }) => {
  //*showing invoice details
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoice, setInvoice] = useState({});

  const getInvoice = (id) => {
    setInvoice({
      number: 1334,
      dateCreated: "12/05/2020",
      secondParty: "شركة زين",
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
    setShowInvoice(true);
  };
  const closeInvoice = () => {
    setShowInvoice(false);
  };

  //* showing contract details
  const [details, setDetails] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleOpen = (id) => {
    setDetails("tamer hosny in the house");
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const fetchInvoices = () => {
    return invoices.map((invoice) => (
      <Grid container className="invoices_data" key={invoice.id}>
        <Grid item xs={2}>
          {invoice.name}
        </Grid>
        <Grid item xs={1}>
          {invoice.date}
        </Grid>
        <Grid item xs={2}>
          {invoice.number}
        </Grid>
        <Grid
          item
          xs={1}
          className="invoice_icon"
          onClick={() => handleOpen(invoice.id)}
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
        <Grid item xs={1} className="invoice_icon">
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

  return (
    <div>
      {showInvoice ? (
        <InvoiceTemplate invoice={invoice} closeInvoice={closeInvoice} />
      ) : (
        <Fade in={true} timeout={500}>
          <div className="invoices_container">
            <AllInvoicesTitle />
            {fetchInvoices()}
          </div>
        </Fade>
      )}
      <Modal open={showDetails} onClose={handleClose} closeAfterTransition>
        <Fade in={showDetails} timeout={500}>
          <div className="details_modal">
            <h3>البيـــان</h3>
            {details}
          </div>
        </Fade>
      </Modal>
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
        التاريخ
      </Grid>
      <Grid item xs={2}>
        رقم الفاتورة
      </Grid>
      <Grid item xs={1}>
        البيــان
      </Grid>
      <Grid item xs={1}>
        العقد
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
