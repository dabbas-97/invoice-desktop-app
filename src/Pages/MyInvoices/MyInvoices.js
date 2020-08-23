import React from "react";
import AllInvoices from "./Components/AllInvoices/AllInvoices";

const MyInvoices = () => {
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

  return <AllInvoices invoices={DUMMY_INVOICES} />;
};

export default MyInvoices;
