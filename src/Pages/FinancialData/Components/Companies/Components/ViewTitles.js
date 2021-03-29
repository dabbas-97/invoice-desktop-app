import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInvoices,
  setInvoices,
} from "../../../../../config/Reducers/invoicesSlice";
import {
  selectReceipts,
  setReceipts,
} from "../../../../../config/Reducers/receiptsSlice";
import { selectTab } from "../../../../../config/Reducers/tabSlice";

export const ViewTitles = () => {
  const dispatch = useDispatch();
  const tab = useSelector(selectTab);
  const invoices = useSelector(selectInvoices);
  const receipts = useSelector(selectReceipts);
  const [sorting, setSorting] = useState({ order: "asc", type: "amount" });

  useEffect(() => {
    if (tab === 1) {
      let sorted = invoices.slice();
      if (sorting.type === "amount") {
        sorted = sorted.sort((a, b) => {
          return sorting.order === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        });
      } else if (sorting.type === "itemNumber") {
        sorted = sorted.sort((a, b) => {
          return sorting.order === "asc"
            ? a.invoiceNumber - b.invoiceNumber
            : b.invoiceNumber - a.invoiceNumber;
        });
      } else if (sorting.type === "title") {
        sorted = sorted.sort((a, b) => {
          if (a.name > b.name && sorting.order === "asc") return 1;
          return -1;
        });
      }

      dispatch(setInvoices(sorted));
    } else {
      let sorted = receipts.slice();
      if (sorting.type === "amount") {
        sorted = sorted.sort((a, b) => {
          return sorting.order === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        });
      } else if (sorting.type === "itemNumber") {
        sorted = sorted.sort((a, b) => {
          return sorting.order === "asc"
            ? a.receiptNumber - b.receiptNumber
            : b.receiptNumber - a.receiptNumber;
        });
      } else if (sorting.type === "title") {
        sorted = sorted.sort((a, b) => {
          if (a.name > b.name && sorting.order === "asc") return 1;
          return -1;
        });
      }
      dispatch(setReceipts(sorted));
    }
  }, [sorting]);

  const sortByAmount = () => {
    if (sorting.type === "amount") {
      if (sorting.order === "desc") {
        setSorting({ order: "asc", type: "amount" });
      } else {
        setSorting({ order: "desc", type: "amount" });
      }
    } else {
      setSorting({ order: "asc", type: "amount" });
    }
  };

  const sortByItemNumber = () => {
    if (sorting.type === "itemNumber") {
      if (sorting.order === "desc") {
        setSorting({ order: "asc", type: "itemNumber" });
      } else {
        setSorting({ order: "desc", type: "itemNumber" });
      }
    } else {
      setSorting({ order: "asc", type: "itemNumber" });
    }
  };

  const sortByTitle = () => {
    if (sorting.type === "title") {
      if (sorting.order === "desc") {
        setSorting({ order: "asc", type: "title" });
      } else {
        setSorting({ order: "desc", type: "title" });
      }
    } else {
      setSorting({ order: "asc", type: "title" });
    }
  };

  const sort = (by) => {
    switch (by) {
      case "title":
        sortByTitle();
        break;
      case "itemNumber":
        sortByItemNumber();
        break;
      case "amount":
        sortByAmount();
        break;
    }
  };
  return (
    <Grid container className="invoices_title">
      <Grid item xs={1}>
        #
      </Grid>
      <Grid item xs={4} onClick={() => sort("title")}>
        الشركة
      </Grid>
      <Grid item xs={2} onClick={() => sort("itemNumber")}>
        الرقم
      </Grid>
      <Grid item xs={2} onClick={() => sort("amount")}>
        القيمة
      </Grid>
      <Grid item xs={1}>
        طباعة
      </Grid>
      <Grid item xs={2}>
        تعديل
      </Grid>
    </Grid>
  );
};
