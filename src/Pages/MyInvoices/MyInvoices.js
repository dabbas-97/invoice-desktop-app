import React, { useState } from "react";
import AllInvoices from "./Components/AllInvoices/AllInvoices";
import { InvoiceForm } from "../forms/InvoiceForm/InvoiceForm";
import { Fade } from "@material-ui/core";
import { InvoiceDialog } from "../forms/InvoiceDialog/InvoiceDialog";

const MyInvoices = ({
  setTab,
  handleInvoice,
  invoiceData,
  handleCheque,
  setInvoiceData,
  clearInvoiceData,
  setDialog,
  dialog,
}) => {
  const [viewType, setViewType] = useState("allInvoices");
  const [invoiceId, setInvoiceId] = useState(null);
  const DUMMY_INVOICES = [
    {
      id: 1,
      amount: 500,
      contract: "لمدة سنة",
      number: 4421,
      date: "12/05/2020",
      name: "شركة زين",
    },
    {
      id: 12,
      amount: 500,
      contract: "لمدة سنة",
      number: 4421,
      date: "12/05/2020",
      name: "شركة زين",
    },
    {
      id: 13,
      amount: 500,
      contract: "لمدة سنة",
      number: 4421,
      date: "12/05/2020",
      name: "شركة زين",
    },
  ];

  const editInvoice = (id) => {
    //Todo: fetch invoice info from database
    setInvoiceId(id);
    setInvoiceData({
      number: 5235235,
      name: "تامر حسني",
      location: "الثامن",
      manager: "خلليل يسبسي",
      phone: "صفر سبعة تسعة خمسة ستة ستة صفر سبعة ثلاث ثمانية",
      email: "حمزة دوت دي اندرسكور سبعة وتسعين اي ياهعو دوت كوم",
      contract: "البيان از هير",
      amountWords: "الف ليرة لا عير",
      amountNumbers: 66634,
      duration: "سنوي",
      payment: "cheque",
      date: new Date(),
      cheque: {
        number: "452535",
        bank: "العربي",
        branch: "دوار الواحة",
        date: new Date(),
      },
      cancel() {
        console.log("edit canceled!");
        clearInvoiceData();
        setViewType("allInvoices");
      },
      confirm() {
        //Todo submit data stored in invoiceData to the invoice with id (invoiceId)
        console.log("invoice edited!");
        setViewType("allInvoices");
        clearInvoiceData();
      },
    });
    setViewType("editInvoice");
  };

  const proceed = () => {
    setDialog({
      action: "حفظ",
      title: `حفظ التغييرات `,
      message: "سيتم حفظ التغييرات على الفاتورة ، إتمام العملية؟",
      openDialog: true,
      confirm() {
        //Todo delete the invoice with the id (dialog.id)
        console.log("invoice edited!!!!");
        invoiceData.confirm();
        setDialog({ openDialog: false });
      },
      cancel() {
        setDialog({ openDialog: false });
      },
    });
  };

  return (
    <>
      {viewType === "allInvoices" ? (
        <AllInvoices
          invoices={DUMMY_INVOICES}
          editInvoice={editInvoice}
          dialog={dialog}
          setDialog={setDialog}
        />
      ) : (
        <Fade in={true} timeout={500}>
          <div className="add_invoice">
            <InvoiceForm
              handleInvoice={handleInvoice}
              invoice={invoiceData}
              handleCheque={handleCheque}
              proceed={proceed}
              dialog={dialog}
            />
          </div>
        </Fade>
      )}
      <InvoiceDialog dialogData={dialog} />
    </>
  );
};

export default MyInvoices;
