import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Customfield from "src/configs/g_components/Customfield";
import ApplicationController from "src/pages/all-students/controller";
import CourseFinderController from "src/pages/course-finder/controller";
import * as yup from "yup";
import CustomButton from "../../CustomButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { successToast } from "../../g_toaster";
import { addeditdata } from "src/reduxStore/editDataSlice";
import StepperFormController from "src/pages/stepperForm/controller";
interface courseDetailsTypes {
  institute_name: string;
  country: string;
  campus_name: string;
  credentials: string;
  program_name: string;
  intake_month: string;
  intake_year: string;
  student: string;
}

const CourseDetails = () => {
  const editData = useSelector(
    (state: any) => state?.data?.alleditdata?.editdata
  );
  const dispatch = useDispatch();
  console.log(editData, "register");
  const stepperFormController = new StepperFormController();
  const locationController = new CourseFinderController();
  const [courseData, setcourseData] = useState<courseDetailsTypes>({
    institute_name: editData?.university_details?.name?._id,
    country: editData?.university_details?.location?.country?._id,
    campus_name: editData?.university_details?.location?.city?._id,
    credentials: editData?.course_details?.program?._id,
    program_name: editData?.course_details?._id,
    intake_month: "",
    intake_year: "",
    student: "",
  });
  const { data, isLoading: locationLoading } = useQuery({
    queryKey: ["All_Locations"],
    queryFn: () =>
      locationController.getAllFilteredLocations({
        city: [],
        state: [],
        country: [],
      }),
  });

  const countryList = data?.data?.data;
  const router = useRouter();
  const StudentController = new ApplicationController();
  const {
    data: ApplicationData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["Application", "TrueApplicationList"],
    queryFn: StudentController.getALLStudent,
  });
  const schema = yup.object().shape({
    institute_name: yup.string(),
    country: yup.string(),
    campus_name: yup.string(),
    credentials: yup.string(),
    program_name: yup.string(),
    intake_month: yup.string(),
    intake_year: yup.string(),
    student: yup.string().required("Please Select a Student"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: { ...courseData },
    resolver: yupResolver(schema),
  });
  const values = watch();
  const { mutate, isPending } = useMutation({
    mutationFn: stepperFormController.addApplication,
    onSuccess: (data) => {
      dispatch(addeditdata(null));
      successToast({ title: "Application Added Successfully!" });
      router.push("/course-finder");
    },
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Course Details" variant={"body1"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <Customfield
                  placeholder="Country"
                  initialize={isLoading}
                  labelName="Country"
                  size={"small"}
                  fullWidth={true}
                  value={editData?.university_details?.location?.country?.name}
                  // register={register("country")}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Customfield
                  placeholder="Name of Institue"
                  initialize={isLoading}
                  labelName="Name of Institute"
                  size={"small"}
                  fullWidth={true}
                  value={editData?.university_details?.name?.name}
                  // register={register("institute_name")}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Customfield
                  placeholder="Campus"
                  initialize={isLoading}
                  labelName="Campus"
                  size={"small"}
                  fullWidth={true}
                  value={editData?.university_details?.location?.city?.name}
                  // register={register("campus_name")}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Customfield
                  placeholder="Credentials"
                  initialize={isLoading}
                  labelName="Credentials"
                  size={"small"}
                  fullWidth={true}
                  value={editData?.course_details?.program?.program_type}
                  // register={register("credentials")}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Customfield
                  placeholder="Program Name"
                  initialize={isLoading}
                  labelName="Program Name"
                  size={"small"}
                  fullWidth={true}
                  value={editData?.course_details?.name}
                  // register={register("program_name")}
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Intake Month</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      // defaultValue={values.commission_type}
                      {...register("intake_month")}
                      // error={!!errors.commission_type}
                    >
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month) => (
                        <MenuItem key={month} value={`${month}`}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={true}>
                      {/* {errors.commission_type &&
                            errors.commission_type.message} */}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Intake Year</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      // defaultValue={values.commission_type}
                      {...register("intake_year")}
                      // error={!!errors.commission_type}
                    >
                      {[
                        "2024",
                        "2025",
                        "2026",
                        "2027",
                        "2028",
                        "2029",
                        "2030",
                      ].map((month) => (
                        <MenuItem key={month} value={`${month}`}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={true}>
                      {/* {errors.commission_type &&
                            errors.commission_type.message} */}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Select Student</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Autocomplete
                    // defaultValue={[]}
                    sx={{ mt: 2 }}
                    options={!isLoading && ApplicationData?.data}
                    size="small"
                    onChange={(event: React.SyntheticEvent, value: any) => {
                      setValue("student", value?._id);
                      clearErrors(["student"]);
                    }}
                    loading={isLoading}
                    fullWidth
                    getOptionLabel={(option) =>
                      option?.first_name +
                        " " +
                        option?.middle_name +
                        " " +
                        option?.last_name || ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Please Select Student or Search"
                        helperText={errors.student?.message}
                        error={!!errors.student}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <CustomButton
                  variant="contained"
                  type="submit"
                  label={"Submit"}
                  initialize={isLoading}
                  isLoading={isPending}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CourseDetails;
