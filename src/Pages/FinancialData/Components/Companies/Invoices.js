import React, { useEffect, useState } from "react";

import { ViewTitles } from "./Components/ViewTitles";
import { ViewInfo } from "./Components/ViewInfo";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  startLoading,
  stopLoading,
} from "../../../../config/Reducers/loadingSlice";

import Axios from "axios";
import { selectLink } from "../../../../config/Reducers/authSlice";

//styling
import { BiPlus } from "react-icons/bi";
import { Button } from "@material-ui/core";
import noInvoicesLogo from "../../../../images/no-companies.svg";
import {
  selectInvoices,
  setInvoices,
} from "../../../../config/Reducers/invoicesSlice";
import { changeInvoicesDataView } from "../../../../config/Reducers/financialDataViewSlice";

export default function Invoices({ editOn }) {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  const link = useSelector(selectLink);

  const invoices = useSelector(selectInvoices);

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(startLoading);
      Axios.get(link + "/invoice").then(async ({ data }) => {
        await dispatch(setInvoices([...data].sort((a, b) =>a.invoiceNumber - b.invoiceNumber)));
        setDataFetched(true);
        dispatch(stopLoading);
      });
    }
  }, [dataFetched, invoices]);

  const renderInvoices = () => {
    if (invoices.length > 0) {
      return invoices.map((invoice, index) => (
        <ViewInfo
          item={invoice}
          key={invoice._id}
          index={index}
          editOn={editOn}
        />
      ));
    } else {
      return (
        <div
          className="no-companies"
          onClick={(e) => dispatch(changeInvoicesDataView(1))}
        >
          <img src={noInvoicesLogo} />
          <h3>
            لا يوجد لديك اية شركات <span>إضافة شركة جديدة</span>
          </h3>
        </div>
      );
    }
  };

  return (
    <>
      {loading ? (
        "loading ..."
      ) : (
        <>
          <div className="new-company">
            <Button
              variant="contained"
              size="medium"
              onClick={(e) => dispatch(changeInvoicesDataView(1))}
              className=" btn"
            >
              <span className="btn-icon">
                فاتورة جديدة
                <span style={{ color: "black" }}>
                  <BiPlus />
                </span>
              </span>
            </Button>
          </div>
          <div className="invoices_container">
            <div className="svg-background">
              <img src={noInvoicesLogo} />
            </div>

            <ViewTitles />
            {renderInvoices()}
          </div>
        </>
      )}
    </>
  );
}
