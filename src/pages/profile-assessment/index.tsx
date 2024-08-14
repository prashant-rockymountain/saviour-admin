import { Button, Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AbilityNames } from "src/configs/g_constants/allConstants";
import AddIcon from "@mui/icons-material/Add";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import CoursesRow from "src/configs/g_components/g_table/Rows/coursesRow";

import Link from "next/link";
import Searchbar from "src/configs/g_components/Searchbar";
import { useQuery } from "@tanstack/react-query";

import GraduationRow from "src/configs/g_components/g_table/Rows/graduationRow";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
// import GraduationController from "./controller";

const TABLE_HEAD = [
  { label: "Sr No.", align: "left" },
  { label: "Name", align: "left" },
  { label: "Status", align: "center" },
  { label: "action", align: "right" },
];
const ProfileAssesment = () => {
  //   const graduationController = new GraduationController();
  const dispatch = useDispatch();
  //   const {
  //     data: graduationData,
  //     isLoading,
  //     isSuccess,
  //   } = useQuery({
  //     queryKey: ["graduation", "GraduationList"],
  //     queryFn: graduationController.getGraduationList,
  //   });
  const [filteredData, setFilteredData] = useState<Array<Record<string, any>>>(
    []
  );
  const profile_assessment_data: Array<any> = [];
  //   useEffect(() => {
  //     if (isSuccess) {
  //       setFilteredData(profile_assessment_data as Array<Record<string, any>>);
  //     }
  //   }, [isSuccess]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={3}>
                <Searchbar
                  data={profile_assessment_data}
                  setFilteredData={setFilteredData}
                />
              </Grid>
              <Grid item xs={9}>
                <Link href={"/profile-assessment/addEdit"}>
                  <Button
                    sx={{ float: "right" }}
                    variant="contained"
                    onClick={() => dispatch(addeditdata(null))}
                  >
                    <AddIcon fontSize="small" /> Add Profile
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid item xs={12} sx={{ my: 4 }}>
          <GTable
            headData={TABLE_HEAD}
            data={filteredData}
            row={GraduationRow}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

ProfileAssesment.acl = {
  subject: AbilityNames.PROFILEASSESSEMENT_PAGE,
};

export default ProfileAssesment;
