import React from "react";
import "./CompanyInfoModal.css";
import { Grid, Modal, Fade } from "@material-ui/core/";
export const CompanyInfoModal = ({
  showCompanyInfo,
  handleClose,
  companyInfo,
}) => {
  return (
    <Modal open={showCompanyInfo} onClose={handleClose} closeAfterTransition>
      <Fade in={showCompanyInfo} timeout={500}>
        <div className="details_modal ">
          <h3>بيانات الشركة</h3>
          <div className="company-info-modal">
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div>الأسم:</div>
              </Grid>
              <Grid item xs={8}>
                <div> {companyInfo.name}</div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div>العنوان:</div>
              </Grid>
              <Grid item xs={8}>
                <div>{companyInfo.location}</div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div>المدير:</div>
              </Grid>
              <Grid item xs={8}>
                <div>{companyInfo.manager}</div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div>هاتف:</div>
              </Grid>
              <Grid item xs={8}>
                <div>{companyInfo.phone}</div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <div>البريد الألكتروني:</div>
              </Grid>
              <Grid item xs={8}>
                <div>{companyInfo.email}</div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
