import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Crumbs from "src/configs/g_components/Crumbs";
import StaffMemberForm from "src/configs/g_components/g_forms/staffMemberForm";
import { AbilityNames } from "src/configs/g_constants/allConstants";

const AddStaffMember = () => {
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
                { title: "Staff Member List", path: "/staff-member" },
                { title: editdata ? "Edit Staff Member" : "Add Staff Member" },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <StaffMemberForm editdata={editdata} />
        </Grid>
      </Grid>
    </>
  );
};

// AddStaffMember.acl = {
//   subject: AbilityNames.STAFF_MEMBER,
// };

export default AddStaffMember;
