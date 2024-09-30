import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Fab,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GChip from "src/configs/g_components/g_chip";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import RoomIcon from "@mui/icons-material/Room";
import PublicIcon from "@mui/icons-material/Public";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Customfield from "src/configs/g_components/Customfield";
import { LoadingButton } from "@mui/lab";
import { TextEditor } from "src/configs/g_components/TextEditor";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useQuery } from "@tanstack/react-query";
import InqueryController from "../controller";
const ProfileViewComment = () => {
  const inqueryController = new InqueryController();
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>();
  const router = useRouter();
  const { app_id: params } = router.query;
  // const data = useSelector((state: any) => state?.data?.alleditdata?.editdata);
  const { data, isLoading } = useQuery({
    queryKey: ["application-profile"],
    queryFn: () => inqueryController.getApplicationProfile(params),
    enabled: !!params,
  });
  console.log(data, "iuhfu");
  const country = data?.country?.name;
  const programType = data?.credentials?.program_type;
  const student = data?.student;
  const programName = data?.program_name?.name;
  const instituteName = data?.institute_name;
  const countryName = data?.country?.name;
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 320, sm: 600 },
    bgcolor: "background.paper",
    boxShadow: 50,
    p: 6,
    overflowX: "auto",
    maxHeight: "700px",
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={4} md={5} sm={12}>
          <Card>
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
                      {student?.first_name +
                        " " +
                        student?.middle_name +
                        " " +
                        student?.last_name}
                    </Typography>
                  )}
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={150} />
                  ) : (
                    <Typography sx={{ color: "black", fontSize: "15px" }}>
                      (GOHP_1993)
                    </Typography>
                  )}
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={30} width={100} />
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
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                      <Skeleton variant="text" width={"100%"} />
                    </>
                  ) : (
                    <>
                      <MenuBookIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                      <Typography
                        sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                      >
                        {instituteName}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                      <Skeleton variant="text" width={"100%"} />
                    </>
                  ) : (
                    <>
                      <SchoolIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                      <Typography
                        sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                      >
                        {programName}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                      <Skeleton variant="text" width={"100%"} />
                    </>
                  ) : (
                    <>
                      <RoomIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                      <Typography
                        sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                      >
                        {countryName}
                      </Typography>
                    </>
                  )}
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="circular"
                        width={25}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                      <Skeleton variant="text" width={"100%"} />
                    </>
                  ) : (
                    <>
                      <PublicIcon sx={{ fontSize: "27px", color: "gray" }} />{" "}
                      <Typography
                        sx={{ color: "gray", fontSize: "14px", ml: "5px" }}
                      >
                        {country}
                      </Typography>
                    </>
                  )}
                </Grid> */}

                <Grid item xs={12} sx={{ mt: "5px", display: "flex" }}>
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                    </>
                  ) : (
                    <span style={{ marginLeft: "10px" }}>
                      <GChip
                        size="small"
                        bgcolor="#008000"
                        color="#008000"
                        label={data?.intake_month + "-" + data?.intake_year}
                      />
                    </span>
                  )}
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                    </>
                  ) : (
                    <span style={{ marginLeft: "10px" }}>
                      <GChip
                        size="small"
                        bgcolor="#A020F0"
                        color="#A020F0"
                        label={programType}
                      />{" "}
                    </span>
                  )}
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={25}
                        sx={{ mr: 3 }}
                      />
                    </>
                  ) : (
                    <span style={{ marginLeft: "10px" }}>
                      <GChip
                        size="small"
                        bgcolor="#FF0000"
                        color="#FF0000"
                        label="DEFER APP"
                      />{" "}
                    </span>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "15px",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={35}
                        sx={{ mr: 3 }}
                      />
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<KeyboardBackspaceIcon />}
                      onClick={() => {
                        router.push("/all-inquiries/" + student?._id);
                      }}
                    >
                      Profile
                    </Button>
                  )}
                  {isLoading ? (
                    <>
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={35}
                        sx={{ mr: 3 }}
                      />
                    </>
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
        <Grid item lg={8} md={7} xs={12}>
          <Card>
            <CardContent>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="text" width={250} />
                ) : (
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Comment
                  </Typography>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" height={35} width={150} />
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      // dispatch(addeditdata(null));
                      setOpen(true);
                    }}
                  >
                    Add Comment
                  </Button>
                )}
                {/* </Link> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Add Comment
              </Typography>
              <Fab
                size="small"
                sx={{ width: "35px", height: "35px" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </Fab>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Choose Template</FormLabel>
              <FormControl fullWidth>
                <Select
                  size={"small"}
                  sx={{ mt: 2 }}
                  // value={values.education_info[index].type}
                  // defaultValue={values.commission_type}
                  //   {...register(`education_info.${index}.type`)}
                  //   error={!!errors?.education_info?.[index]?.type}
                >
                  <MenuItem value={"on campus"}></MenuItem>
                </Select>
                {/* <FormHelperText error={true}>
                  {!!errors?.education_info?.[index]?.type &&
                    errors?.education_info?.[index]?.type?.message}
                </FormHelperText> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Customfield
                placeholder="Enter Comment Titles"
                initialize={false}
                labelName="Comment Title"
                size={"small"}
                fullWidth={true}
                // register={register(`education_info.${index}.institute`)}
                // error={!!errors?.education_info?.[index]?.institute}
                // helperText={errors?.education_info?.[index]?.institute?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <TextEditor
                    placeholder="Comment"
                    editorState={editorState}
                    onEditorStateChange={(newEditorState) => {
                      setEditorState(newEditorState);
                      const htmlContent = convertToHTML(
                        newEditorState.getCurrentContent()
                      );
                      //   setValue("about", htmlContent);
                    }}
                    toolbar={{
                      options: ["inline", "history"],
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Customfield
                // placeholder="Enter Comment Titles"
                initialize={false}
                labelName="Paid Tution Fee"
                size={"small"}
                fullWidth={true}
                // register={register(`education_info.${index}.institute`)}
                // error={!!errors?.education_info?.[index]?.institute}
                // helperText={errors?.education_info?.[index]?.institute?.message}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "end" }}>
              <LoadingButton variant="contained">Submit</LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileViewComment;
