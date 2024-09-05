import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import RoleController from "../role/controller";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import AcademicDocumentsRow from "src/configs/g_components/g_table/Rows/academicDocumentsRow";

const Document = ({ data }: { data: Record<string, any> }) => {
  const TABLE_HEAD = [
    { label: "SR.No", align: "left" },
    { label: "Documents", align: "left" },
    { label: "Link", align: "center" },
    { label: "Action", align: "center" },
  ];
  const roleController = new RoleController();

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["Role"],
  //     queryFn: roleController.getRole,
  //   });
  const docData = Object.entries(data).filter(
    (item: any) => item[1]?.length > 0
  );
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "bold", color: "black" }}
          >
            Documentation
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography
            sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
          >
            Academic Documents
          </Typography>
        </Grid>
        <Grid item xs={12} my={4}>
          <GTable
            headData={TABLE_HEAD}
            data={docData}
            isLoading={false}
            row={AcademicDocumentsRow}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default Document;
