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
import noReceiptsLogo from "../../../../images/no-receipts.svg";
import {
  selectReceipts,
  setReceipts,
} from "../../../../config/Reducers/receiptsSlice";
import { changeReceiptsDataView } from "../../../../config/Reducers/financialDataViewSlice";

export default function Receipts({ editOn }) {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  const link = useSelector(selectLink);

  const receipts = useSelector(selectReceipts);

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(startLoading);
      Axios.get(link + "/receipt").then(async ({ data }) => {
        await dispatch(setReceipts([...data].sort((a, b) =>a.receiptNumber - b.receiptNumber))); 
        setDataFetched(true);
        dispatch(stopLoading);
      });
    }
  }, [dataFetched, receipts]);

  const renderReceipts = () => {
    if (receipts.length > 0) {
      return receipts.map((receipt, index) => (
        <ViewInfo
          item={receipt}
          key={receipt._id}
          index={index}
          editOn={editOn}
        />
      ));
    } else {
      return (
        <div
          className="no-companies"
          onClick={(e) => dispatch(changeReceiptsDataView(1))}
        >
          <img src={noReceiptsLogo} />
          <h3>
            لا يوجد لديك اي سند قبض <span>إضافة سند قبض جديد</span>
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
              onClick={(e) => dispatch(changeReceiptsDataView(1))}
              className=" btn"
            >
              <span className="btn-icon">
                سند قبض جديد
                <span style={{ color: "black" }}>
                  <BiPlus />
                </span>
              </span>
            </Button>
          </div>
          <div className="invoices_container">
            <div className="svg-background">
              <img src={noReceiptsLogo} />
            </div>

            <ViewTitles />
            {renderReceipts()}
          </div>
        </>
      )}
    </>
  );
}
