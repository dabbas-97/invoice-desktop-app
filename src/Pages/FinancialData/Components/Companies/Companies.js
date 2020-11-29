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
import {
  selectCompanies,
  setCompanies,
} from "../../../../config/Reducers/companiesSlice";
import Axios from "axios";
import { selectLink } from "../../../../config/Reducers/authSlice";

import { changeView } from "../../../../config/Reducers/financialDataViewSlice";

//styling
import { BiPlus } from "react-icons/bi";
import { Button } from "@material-ui/core";
import noCompaniesLogo from "../../../../images/no-companies.svg";

export default function Companies() {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  const link = useSelector(selectLink);

  const companies = useSelector(selectCompanies);

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(startLoading);
      Axios.get(link + "/company").then(async ({ data }) => {
        await dispatch(setCompanies([...data]));
        setDataFetched(true);
        dispatch(stopLoading);
      });
    }
  }, [dataFetched, companies]);

  const renderCompanies = () => {
    if (companies.length > 0) {
      return companies.map((company, index) => (
        <ViewInfo company={company} key={company._id} index={index} />
      ));
    } else {
      return (
        <div className='no-companies' onClick={(e) => dispatch(changeView(4))}>
          <img src={noCompaniesLogo} />
          <h3>
            لا يوجد لديك اية شركات <span>إضافة شركة جديدة</span>
          </h3>
        </div>
      );
    }
  };

  return (
    <div>
      {loading ? (
        "loading ..."
      ) : (
        <div class='financial-data'>
          <div className='new-company'>
            <Button
              variant='contained'
              size='medium'
              onClick={(e) => dispatch(changeView(4))}
              className=' btn'>
              <span className='btn-icon'>
                شركة جديدة
                <span style={{ color: "black" }}>
                  <BiPlus />
                </span>
              </span>
            </Button>
          </div>
          <div className='invoices_container'>
            <div className='svg-background'>
              <img src={noCompaniesLogo} />
            </div>

            <ViewTitles />
            {renderCompanies()}
          </div>
        </div>
      )}
    </div>
  );
}
