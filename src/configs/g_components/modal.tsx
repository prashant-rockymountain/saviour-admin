import { Box, Button, Fab, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import CustomButton from "./CustomButton";
import CancelIcon from "@mui/icons-material/Cancel";

const GModal = ({
  open,
  onclose,
  component,
}: {
  open: boolean;
  onclose: Function | any;
  component: any;
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 300, sm: 600, md: 800 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12} sx={{ textAlign: "end" }}>
            <Fab
              size="small"
              onClick={() => {
                onclose();
              }}
            >
              <CancelIcon color="primary" />
            </Fab>
          </Grid>

          <Grid item xs={12}>
            {component}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default GModal;
