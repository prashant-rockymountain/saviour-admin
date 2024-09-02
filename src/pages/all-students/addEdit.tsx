import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Crumbs from "src/configs/g_components/Crumbs";
import ProfileAssessmentForm from "src/configs/g_components/g_forms/ProfileAssessmentForm";
import { AbilityNames } from "src/configs/g_constants/allConstants";

const AddEditProfileAssessment = () => {
  const editdata = useSelector(
    (state: any) => state?.data?.alleditdata?.editdata
  );
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box>
            <Crumbs
              links={[
                { title: "All Applications", path: "/all-students" },
                { title: `${editdata?._id ? `Edit` : `Add`} Profile` },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ProfileAssessmentForm editdata={editdata} id={editdata?._id} />
        </Grid>
      </Grid>
    </>
  );
};
AddEditProfileAssessment.acl = {
  subject: AbilityNames.ALLAPPLICATION_PAGE,
};
export default AddEditProfileAssessment;
