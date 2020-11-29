import { Grid } from "@material-ui/core";
import React from "react";

export const ViewTitles = () => {
  return (
    <Grid container className='invoices_title'>
      <Grid item xs={2}>
        الرقم
      </Grid>
      <Grid item xs={3}>
        الشركة
      </Grid>
      <Grid item xs={2}>
        العقد
      </Grid>
      <Grid item xs={2}>
        الفاتورة
      </Grid>
      <Grid item xs={2}>
        سند القبض
      </Grid>
      <Grid item xs={1}>
        مسح
      </Grid>
    </Grid>
  );
};
