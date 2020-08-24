import React from "react";
import "./ContractModal.css";
import { Modal, Fade } from "@material-ui/core/";
export const ContractModal = ({
  showContract,
  handleClose,
  contractDetails,
}) => {
  return (
    <Modal open={showContract} onClose={handleClose} closeAfterTransition>
      <Fade in={showContract} timeout={500}>
        <div className="details_modal contract-modal">
          <h3>البيـــان</h3>
          <p>{contractDetails}</p>
        </div>
      </Fade>
    </Modal>
  );
};
