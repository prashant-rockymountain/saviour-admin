import {
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";
import React, { useState } from "react";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import Searchbar from "src/configs/g_components/Searchbar";
import GModal from "src/configs/g_components/modal";
import { useQuery } from "@tanstack/react-query";
import RoleOptionsRow from "src/configs/g_components/g_table/Rows/roleOptionsRow";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import RoleoptionController from "./controller";
import { AbilityNames } from "src/configs/g_constants/allConstants";

const TABLE_HEAD = [
  { label: "SR.No", align: "left" },
  { label: "Name", align: "left" },
  { label: "Status", align: "center" },
  { label: "actions", align: "center" },
];

const RoleOptionsTable = () => {
  const roleoptionController = new RoleoptionController();
  const [open, setOpen] = useState(false);
  const onclose = () => {
    setOpen(false);
  };

  const { data,isLoading } = useQuery({
    queryKey: ["RoleOptionList"],
    queryFn: roleoptionController.getRoleOptionList,
  });
  const dispatch = useDispatch();
  const rows = data?.data?.data;
  const [filteredData, setFilteredData] =
    useState<Array<Record<string, any>>>(rows);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <GModal
            open={open}
            onclose={onclose}
            component={<></>}
          />
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
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpen(true), dispatch(addeditdata(null));
                    }}
                  >
                    Add Role Options
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid item xs={12} my={4}>
            <GTable
              headData={TABLE_HEAD}
              data={filteredData}
              isLoading={isLoading}
              row={RoleOptionsRow}
              open={setOpen}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
RoleOptionsTable.acl = {
  subject: AbilityNames.ROLEOPTION_PAGE,
};

export default RoleOptionsTable;
