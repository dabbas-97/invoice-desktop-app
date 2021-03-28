import { Grid } from "@material-ui/core";
import React from "react";

export const ViewTitles = () => {
  return (
    <Grid container className="invoices_title">
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
