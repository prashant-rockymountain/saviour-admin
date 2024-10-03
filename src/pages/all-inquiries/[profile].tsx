import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Skeleton,
  Tab,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GChip from "src/configs/g_components/g_chip";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import RoomIcon from "@mui/icons-material/Room";
import PublicIcon from "@mui/icons-material/Public";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { useRouter } from "next/router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StudentProfile from "./student_profile_tab";
import Document from "./document_tab";
import OfferedCourses from "./offered_courses_tab";
import Application from "./application_tab";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import InqueryController from "./controller";
import { addeditdata } from "src/reduxStore/editDataSlice";
const ProfileBack = () => {
  const inqueryController = new InqueryController();
  const router = useRouter();
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  // const editData = useSelector(
  //   (state: Record<string, any>) => state?.data?.alleditdata?.editdata
  // );

  const { profile: params } = router.query;

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["inqueryProfile", params],
    enabled: !!params,
    queryFn: () => inqueryController.getInqueryProfile(params),
  });

  const studentData = data?.data;
  const documents = studentData?.documents;
  const applications = studentData?.applications;
  useEffect(() => {
    dispatch(addeditdata(data?.data));
  }, [isSuccess]);
  // console.log(documents, "editData");

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={4} md={3} sm={12}>
          <Card sx={{ mt: { md: 16 } }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <AccountCircleIcon sx={{ width: "100px", height: "100px" }} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={150} />
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "bold",

                        fontSize: "18px",
                      }}
                    >
                      {(
                        studentData?.first_name +
                        " " +
                        studentData?.middle_name +
                        " " +
                        studentData?.last_name
                      ).toCapitalize()}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={150} />
                  ) : (
                    <Typography sx={{ fontSize: "15px" }}>
                      (GOHP_1993)
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={20} width={100} />
                  ) : (
                    <GChip
                      size="medium"
                      bgcolor="#808080"
                      color="#808080"
                      label="PND-VISA"
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: "15px" }}>
                {/* <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <MenuBookIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                  <Typography
                    sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                  >
                    FANSHAWE COLLEGE
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SchoolIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                  <Typography
                    sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                  >
                    Early Child Hood Education
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <RoomIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                  <Typography
                    sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                  >
                    London
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PublicIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                  <Typography
                    sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                  >
                    {studentData?.country}
                  </Typography>
                </Grid> */}

                {/* <Grid item xs={12} sx={{ mt: "5px" }}>
                  <span style={{ marginLeft: "10px" }}>
                    <GChip
                      size="small"
                      bgcolor="#008000"
                      color="#008000"
                      label="SEP-2024"
                    />
                  </span>
                  <span style={{ marginLeft: "10px" }}>
                    <GChip
                      size="small"
                      bgcolor="#A020F0"
                      color="#A020F0"
                      label="DIPLOMA"
                    />{" "}
                  </span>
                  <span style={{ marginLeft: "10px" }}>
                    <GChip
                      size="small"
                      bgcolor="#FF0000"
                      color="#FF0000"
                      label="DEFER APP"
                    />{" "}
                  </span>
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center", mt: "15px" }}
                >
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={35} width={120} />
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<KeyboardBackspaceIcon />}
                      onClick={() => {
                        router.push("/all-inquiries");
                      }}
                    >
                      Back
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={8} md={9} xs={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  variant="scrollable"
                  aria-label="lab API tabs example"
                >
                  {" "}
                  {isLoading ? (
                    <Skeleton variant="text" width={90} sx={{ mr: 3 }} />
                  ) : (
                    <Tab label="Profile" value="1" />
                  )}
                  {isLoading ? (
                    <Skeleton variant="text" width={90} sx={{ mr: 3 }} />
                  ) : (
                    <Tab label="Application" value="3" />
                  )}
                  {isLoading ? (
                    <Skeleton variant="text" width={90} sx={{ mr: 3 }} />
                  ) : (
                    <Tab label="Documents" value="2" />
                  )}
                  {isLoading ? (
                    <Skeleton variant="text" width={90} sx={{ mr: 3 }} />
                  ) : (
                    <Tab label="Other Service" value="4" />
                  )}
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ p: "24px 0px" }}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <StudentProfile
                        data={studentData}
                        isLoading={isLoading}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </TabPanel>
              <TabPanel value="2" sx={{ p: "24px 0px" }}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Document data={documents} />
                    </CardContent>
                  </Card>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Application data={applications} />
                    </CardContent>
                  </Card>
                </Grid>
              </TabPanel>
              <TabPanel value="4">
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <OfferedCourses />
                    </CardContent>
                  </Card>
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileBack;
