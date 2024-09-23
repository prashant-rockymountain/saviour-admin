import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import RoleController from "../role/controller";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import AcademicDocumentsRow from "src/configs/g_components/g_table/Rows/academicDocumentsRow";

const Document = ({ data }: { data: Record<string, any> }) => {
  const TABLE_HEAD = [
    { label: "Documents", align: "left" },
    { label: "Status", align: "center" },
    { label: "Action", align: "center" },
  ];
  const roleController = new RoleController();

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["Role"],
  //     queryFn: roleController.getRole,
  //   });
  // console.log(data, "documents");

  const docData = Object?.entries(data);
  const dispatch = useDispatch();
  console.log(docData, "documents", data);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Documentation
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Academic Documents
          </Typography>
        </Grid>
        <Grid item xs={12} my={4}>
          <GTable
            headData={TABLE_HEAD}
            data={docData.slice(0, 5)}
            isLoading={false}
            row={AcademicDocumentsRow}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            English Proficiency Test Score
          </Typography>
        </Grid>
        <Grid item xs={12} my={4}>
          <GTable
            headData={TABLE_HEAD}
            data={docData.slice(5, 6)}
            isLoading={false}
            row={AcademicDocumentsRow}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Additional Documents
          </Typography>
        </Grid>
        <Grid item xs={12} my={4}>
          <GTable
            headData={TABLE_HEAD}
            data={docData.slice(6, 10)}
            isLoading={false}
            row={AcademicDocumentsRow}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            VIsa Document
          </Typography>
        </Grid>
        <Grid item xs={12} my={4}>
          <GTable
            headData={TABLE_HEAD}
            data={docData.slice(10)}
            isLoading={false}
            row={AcademicDocumentsRow}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default Document;
