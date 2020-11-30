import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectContractInfo,
  setContract,
} from "../../../../config/Reducers/contractSlice";

//styling
import { TextField, Grid, Button } from "@material-ui/core";
import contractSvg from "../../../../images/contract.svg";

import { AiOutlineCheck } from "react-icons/ai";
import { BsReverseBackspaceReverse } from "react-icons/bs";

export default function ContractForm({ cancel, proceed }) {
  const dispatch = useDispatch();
  const contract = useSelector(selectContractInfo);

  const saveContract = (e) => {
    e.preventDefault();
    proceed();
  };

  const handleContract = (input) => (e) => {
    dispatch(setContract({ ...contract, [input]: e.target.value }));
  };

  return (
    <form
      autoComplete='off'
      className='add_invoice_form add_invoice'
      onSubmit={saveContract}>
      <Grid container direction='row' spacing={4}>
        <Grid item xs={8} className='form-container'>
          <h3> بيانات العقد</h3>
          <div className='form-input-container'>
            <Grid container direction='row' spacing={4}>
              <Grid container item xs={6}>
                <TextField
                  onChange={handleContract("description")}
                  label='البيان'
                  variant='outlined'
                  size='small'
                  value={contract.description}
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  onChange={handleContract("duration")}
                  label='المدة'
                  variant='outlined'
                  size='small'
                  value={contract.duration}
                />
              </Grid>
            </Grid>
          </div>
          <hr />
          <Grid container direction='row' spacing={4}>
            <Grid item xs={2}>
              <Button
                variant='outlined'
                size='medium'
                color='primary'
                onClick={() => cancel()}
                className='cancel-btn btn'>
                <span className='btn-icon'>
                  <BsReverseBackspaceReverse />
                </span>
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Button
                variant='outlined'
                size='medium'
                color='primary'
                type='submit'
                onClick={() => proceed()}
                className=' btn'>
                <span className='btn-icon'>
                  <AiOutlineCheck />
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div className='page-logo-svg'>
            <img src={contractSvg} />
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
