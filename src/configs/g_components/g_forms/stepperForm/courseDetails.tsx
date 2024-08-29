import { yupResolver } from "@hookform/resolvers/yup";
import {
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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Customfield from "src/configs/g_components/Customfield";
import CourseFinderController from "src/pages/course-finder/controller";
import { StepperFormController } from "src/pages/stepperForm/controller";
import * as yup from "yup";
interface courseDetailsTypes {
  name: string;
  country: string;
  campus: string;
  credentials: string;
  program: string;
  intake_month: string;
  intake_year: string;
}

const CourseDetails = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const locationController = new CourseFinderController();
  const [courseData, setcourseData] = useState<courseDetailsTypes>({
    name: "",
    country: "",
    campus: "",
    credentials: "",
    program: "",
    intake_month: "",
    intake_year: "",
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
  const isLoading = false;

  const schema = yup.object().shape({
    name: yup.string(),
    country: yup.string(),
    campus: yup.string(),
    credentials: yup.string(),
    program: yup.string(),
    intake_month: yup.string(),
    intake_year: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { ...courseData },
    resolver: yupResolver(schema),
  });
  const values = watch();
  console.log(values, "register");
  const onSubmit = () => {
    setActiveStep((prev) => prev + 1);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Course Details" variant={"body1"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Country</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      // value={courseData.country}
                      // defaultValue={values.commission_type}
                      {...register("country")}
                      // error={!!errors.commission_type}
                    >
                      {countryList?.map(
                        (country: Record<string, any>, index: number) => (
                          <MenuItem value={`${country?._id}`}>
                            {country?.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText error={true}>
                      {/* {errors.commission_type &&
                            errors.commission_type.message} */}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Customfield
                  placeholder="Name of Institue"
                  initialize={isLoading}
                  labelName="Name of Institute"
                  size={"small"}
                  fullWidth={true}
                  register={register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Campus</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      displayEmpty={true}
                      // value={values.campus}
                      sx={{ mt: 2 }}
                      // renderValue={(selected: string) => {
                      //   if (selected?.length === 0) {
                      //     return (
                      //       <span style={{ fontStyle: "italic" }}>
                      //         Select Campus
                      //       </span>
                      //     );
                      //   }
                      //   return selected;
                      // }}
                      // defaultValue={values.commission_type}
                      {...register("campus")}
                      // error={!!errors.commission_type}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {/* {errors.commission_type &&
                            errors.commission_type.message} */}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Credentials</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      // defaultValue={values.commission_type}
                      {...register("credentials")}
                      // error={!!errors.commission_type}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {/* {errors.commission_type &&
                            errors.commission_type.message} */}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Program Name</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      // defaultValue={values.commission_type}
                      {...register("program")}
                      // error={!!errors.commission_type}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button variant="contained" type="submit">
                  Next
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CourseDetails;
