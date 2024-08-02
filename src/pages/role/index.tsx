import { Button, Card, CardContent, Grid, Skeleton } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import Searchbar from "src/configs/g_components/Searchbar";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";

import RoleController from "./controller";
import RoleRow from "src/configs/g_components/g_table/Rows/roleRow";
import { AbilityNames } from "src/configs/g_constants/allConstants";

const TABLE_HEAD = [
  { label: "SR.No", align: "left" },
  { label: "Name", align: "left" },
  { label: "Status", align: "center" },
  { label: "actions", align: "center" },
];

const RoleTable = () => {
  const roleController = new RoleController();

  const { data, isLoading } = useQuery({
    queryKey: ["Role"],
    queryFn: roleController.getRole,
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
                      width={100}
                      height={20}
                    ></Skeleton>
                  ) : (
                    <Searchbar data={rows} setFilteredData={setFilteredData} />
                  )}
                </Grid>
                <Grid item sm={8} sx={{ textAlign: "right" }}>
                  <Link href={"/role/addEditRole"}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(addeditdata(null));
                      }}
                    >
                      Add Role
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
              row={RoleRow}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
RoleTable.acl = {
  subject: AbilityNames.ROLE_PAGE,
};

export default RoleTable;
