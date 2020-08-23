import React, { useState, useEffect } from "react";
import { Fade, TextField } from "@material-ui/core";

const AddInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({ name: "", number: 0 });

  useEffect(() => {
    console.log(invoiceData);
  }, [invoiceData]);

  const handleChange = (value) => (e) => {
    setInvoiceData({ ...invoiceData, [value]: e.target.value });
  };

  return (
    <Fade in={true} timeout={500}>
      <div className="add_invoice">
        <form autoComplete="off">
          <TextField
            onChange={handleChange("name")}
            label="قاسم ابو الكص"
            variant="outlined"
          />
          <TextField
            onChange={handleChange("number")}
            label="number"
            variant="outlined"
          />
        </form>
      </div>
    </Fade>
  );
};

export default AddInvoice;
