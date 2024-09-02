import { Button, Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AbilityNames } from "src/configs/g_constants/allConstants";
import AddIcon from "@mui/icons-material/Add";
import GTable from "src/configs/g_components/g_table/Table/g_table";

import Link from "next/link";
import Searchbar from "src/configs/g_components/Searchbar";
import { useQuery } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import ApplicationController from "./controller";
import StudentsRow from "src/configs/g_components/g_table/Rows/studentsRow";
// import GraduationController from "./controller";

const TABLE_HEAD = [
  { label: "Sr No.", align: "left" },
  { label: "Name", align: "left" },
  { label: "Email", align: "left" },
  { label: "Phone", align: "left" },
  { label: "Status", align: "center" },
  { label: "action", align: "right" },
];
const AllStudents = () => {
  const StudentController = new ApplicationController();
  const dispatch = useDispatch();
  const {
    data: ApplicationData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["Application", "ApplicationList"],
    queryFn: StudentController.getALLStudent,
  });
  const [filteredData, setFilteredData] = useState<Array<Record<string, any>>>(
    []
  );
  const all_application_data: Array<any> = ApplicationData?.data;
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
                {/* <Searchbar
                  data={all_application_data}
                  setFilteredData={setFilteredData}
                /> */}
              </Grid>
              <Grid item xs={9}>
                <Link href={"/all-students/addEdit"}>
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
            data={all_application_data}
            row={StudentsRow}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

AllStudents.acl = {
  subject: AbilityNames.ALLSTUDENTS_PAGE,
};

export default AllStudents;
