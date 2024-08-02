import { Box, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Crumbs from "src/configs/g_components/Crumbs";
import { AbilityNames } from "src/configs/g_constants/allConstants";

const AddRole = () => {
  const editdata = useSelector((state: any) => state?.data?.alleditdata?.editdata);
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box>
            <Crumbs
              links={[
                { title: "Role List", path: "/role" },
                { title: editdata ? "Edit Role" : "Add Role" },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {/* <RoleForm /> */}
        </Grid>
      </Grid>
    </>
  );
};
AddRole.acl = {
  subject: AbilityNames.ROLE_PAGE,
};
export default AddRole;
