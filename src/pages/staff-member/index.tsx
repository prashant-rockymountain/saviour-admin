import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import { textcolor } from "src/configs/theme/palette";
import Searchbar from "src/configs/g_components/Searchbar";
import GModal from "src/configs/g_components/modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RoleOptionsRow from "src/configs/g_components/g_table/Rows/roleOptionsRow";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import RoleoptionController from "../tile-options/controller";
import RoleRow from "src/configs/g_components/g_table/Rows/roleRow";
import RoleController from "../role/controller";
import StaffMemberRow from "src/configs/g_components/g_table/Rows/staffMemberRow";
import StaffController from "./controller";
import { AbilityNames } from "src/configs/g_constants/allConstants";

const TABLE_HEAD = [
  { label: "sr no", align: "left" },
  { label: "Profile Image", align: "left" },
  { label: "Agency Name", align: "left" },
  { label: "Phone", align: "left" },
  { label: "E-Mail", align: "left" },
  { label: "Status", align: "left" },
  { label: "Action", align: "left" },
];

const StaffMemberTable = () => {
  const staffController = new StaffController();

  const { data, isSuccess, error, isFetching, isLoading } = useQuery({
    queryKey: ["Staff-Member"],
    queryFn: () => staffController.getStaffMember(),
  });

  const dispatch = useDispatch();
  const rows = data?.data?.data;
  const [filteredData, setFilteredData] =
    useState<Array<Record<string, any>>>(rows);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  {isLoading ? (
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={32}
                   />
                  ) : (
                    <Searchbar data={rows} setFilteredData={setFilteredData} />
                  )}
                </Grid>
                <Grid item sm={8} sx={{ textAlign: "right" }}>
                  <Link href={"/staff-member/addEditStaffMember"}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(addeditdata(null));
                      }}
                    >
                      Add Staff Member
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid item xs={12} my={4}>
            <GTable
              headData={TABLE_HEAD}
              data={filteredData}
              isLoading={isLoading}
              row={StaffMemberRow}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// StaffMemberTable.acl = {
//   subject: AbilityNames.STAFF_MEMBER,
// };

export default StaffMemberTable;
