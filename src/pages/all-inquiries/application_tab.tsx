import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { ApplicationCard } from "src/configs/g_components/ApplicationCard";
import GChip from "src/configs/g_components/g_chip";

const Application = ({ data }: { data: [Record<string, any>] }) => {
  console.log(data, "applosdij");

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Applications
          </Typography>
        </Grid>
        {data?.map((application: Record<string, any>, index: number) => (
          <ApplicationCard data={application} />
        ))}
      </Grid>
    </>
  );
};
export default Application;
