import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const StudentProfile = ({ data }: { data: Record<string, any> }) => {
  console.log(data, "Student_Profile");

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            sx={{ fontSize: "20px",  fontWeight: "bold" }}
          >
            Student Profile
          </Typography>
          <Link href={"/all-students/addEdit"}>
            <Button variant="contained">Edit Profile</Button>
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Full Name :</span>{" "}
            {data?.first_name + " " + data?.middle_name + " " + data?.last_name}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: "20px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}> Education :</span>{" "}
            {data?.education_info?.at(-1)?.level}
          </Typography>
        </Grid> */}
        <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Student Code :</span> dhsjdh
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Stream :</span>
            {data?.education_info?.at(-1)?.stream}
          </Typography>
        </Grid> */}
        <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Gender :</span> {data?.gender}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}> Passing Year :</span>{" "}
            {data?.education_info?.at(-1)?.passing_year}
          </Typography>
        </Grid> */}
        <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Passport Number :</span>{" "}
            {data?.passport_number}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Result :</span>{" "}
            {data?.education_info?.at(-1)?.result}
          </Typography>
        </Grid> */}
        <Grid item xs={12} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Email</span> : {data?.email}
          </Typography>
        </Grid>
        {/* <Grid item xs={6} sx={{ mt: "10px" }}>
          <Typography sx={{ fontSize: "18px", color: "black" }}>
            <span style={{ fontWeight: "bold" }}> BackLogs</span> :{" "}
            {data?.education_info?.at(-1)?.backlog_number}
          </Typography>
        </Grid> */}
      </Grid>
    </>
  );
};
export default StudentProfile;
