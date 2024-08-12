import { yupResolver } from "@hookform/resolvers/yup";
import { CheckBox } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Customfield from "src/configs/g_components/Customfield";
import * as yup from "yup";
import { ISchema } from "yup";
interface courseDetailsTypes {
  first_name: string;
  middle_name: string;
  last_name: string;
  passport: string;
  gender: string;
  is_onshore: boolean;
  is_visa_rejection: boolean;
  visa_rejection: {
    country: string;
    month_year: string;
    visa_type: string;
  };
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address: string;
  email_id: string;
  mobile: string;
  credit_card_no: string;
  expiry_date: string;
  cvv: string;
  card_no: string;
}
const StudentInfo = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [courseData, setcourseData] = useState<courseDetailsTypes>({
    first_name: "",
    middle_name: "",
    last_name: "",
    passport: "",
    gender: "",
    is_onshore: false,
    is_visa_rejection: false,
    visa_rejection: {
      country: "",
      month_year: "",
      visa_type: "",
    },
    country: "",
    state: "",
    city: "",
    postal_code: "",
    address: "",
    email_id: "",
    mobile: "",
    credit_card_no: "",
    expiry_date: "",
    cvv: "",
    card_no: "",
  });
  const isLoading = false;
  const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    middle_name: yup.string(),
    last_name: yup.string(),
    passport: yup.string(),
    gender: yup.string(),
    is_onshore: yup.bool(),
    is_visa_rejection: yup.bool(),
    visa_rejection: yup.object().shape({
      country: yup.string().when("is_visa_rejection", {
        is: (val: boolean) => val === true,
        then: () => yup.string().required("Please Select Country"),
      }),
      month_year: yup.string().when("is_visa_rejection", {
        is: (val: boolean) => val === true,
        then: () => yup.string().required("Please Enter Month Year"),
      }),
      visa_type: yup.string().when("is_visa_rejection", {
        is: (val: boolean) => val === true,
        then: () => yup.string().required("Please Select Visa type"),
      }),
    }),
    country: yup.string(),
    state: yup.string(),
    city: yup.string(),
    postal_code: yup.string(),
    address: yup.string(),
    email_id: yup.string(),
    mobile: yup.string(),
    credit_card_no: yup.string(),
    expiry_date: yup.string(),
    cvv: yup.string(),
    card_no: yup.string(),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { ...courseData },
    resolver: yupResolver(schema),
  });
  const onSubmit = () => {
    setActiveStep((prev) => prev + 1);
  };
  const values = watch();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Student Info" variant={"body1"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter First name"
                  initialize={isLoading}
                  labelName="First Name"
                  size={"small"}
                  fullWidth={true}
                  register={register("first_name")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Middle Name"
                  initialize={isLoading}
                  labelName="Middle Name"
                  size={"small"}
                  fullWidth={true}
                  register={register("middle_name")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Last Name"
                  initialize={isLoading}
                  labelName="Last Name"
                  size={"small"}
                  fullWidth={true}
                  register={register("last_name")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Passport no"
                  initialize={isLoading}
                  labelName="Passport No"
                  size={"small"}
                  fullWidth={true}
                  register={register("passport")}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Gender</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      {...register("gender")}
                    >
                      <MenuItem value={"fixed"}>Male</MenuItem>
                      <MenuItem value={"percentage"}>Female</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {/* {errors.commission_type &&
                            errors.commission_type.message} */}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item sm={4} md={2} mt={7}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={values.is_onshore} />}
                  label="is Onshore?"
                  {...register("is_onshore")}
                />
              </Grid>
              <Grid item sm={4} md={2} mt={7}>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked={values.is_visa_rejection} />
                  }
                  label="Visa Rejection"
                  {...register("is_visa_rejection")}
                />
              </Grid>
              {values.is_visa_rejection && (
                <>
                  <CardHeader title="Visa Rejection" variant={"body1"} />
                  <Grid item xs={12}>
                    <Grid container spacing={6} mb={6}>
                      <Grid item xs={12} sm={6} md={4}>
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
                              displayEmpty={true}
                              sx={{ mt: 2 }}
                              {...register("visa_rejection.country")}
                              error={!!errors?.visa_rejection?.country}
                            >
                              <MenuItem value={"fixed"}>Fixed</MenuItem>
                              <MenuItem value={"percentage"}>
                                Percentage
                              </MenuItem>
                            </Select>
                            <FormHelperText error={true}>
                              {errors?.visa_rejection?.country &&
                                errors.visa_rejection.country.message}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Customfield
                          placeholder="JAN-2024"
                          initialize={isLoading}
                          labelName="Month Year"
                          size={"small"}
                          fullWidth={true}
                          register={register("passport")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        {isLoading ? (
                          <Skeleton variant="text" width={140} />
                        ) : (
                          <FormLabel>Visa Type</FormLabel>
                        )}
                        {isLoading ? (
                          <Skeleton variant="text" width="100%" height={45} />
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              size={"small"}
                              displayEmpty={true}
                              sx={{ mt: 2 }}
                              {...register("visa_rejection.country")}
                              error={!!errors?.visa_rejection?.country}
                            >
                              <MenuItem value={"fixed"}>Fixed</MenuItem>
                              <MenuItem value={"percentage"}>
                                Percentage
                              </MenuItem>
                            </Select>
                            <FormHelperText error={true}>
                              {errors?.visa_rejection?.country &&
                                errors.visa_rejection.country.message}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6} md={4}>
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
                      displayEmpty={true}
                      sx={{ mt: 2 }}
                      {...register("country")}
                      error={!!errors.country}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.country && errors.country.message}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>State</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      displayEmpty={true}
                      sx={{ mt: 2 }}
                      {...register("state")}
                      error={!!errors.state}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.state && errors.state.message}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>City</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      displayEmpty={true}
                      sx={{ mt: 2 }}
                      {...register("city")}
                      error={!!errors.city}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.city && errors.city.message}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Mobile Number without Country Code"
                  initialize={isLoading}
                  labelName="Mobile Number"
                  size={"small"}
                  fullWidth={true}
                  register={register("mobile")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Email Id"
                  initialize={isLoading}
                  labelName="Email"
                  size={"small"}
                  fullWidth={true}
                  register={register("email_id")}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Postal Code"
                  initialize={isLoading}
                  labelName="Postal Code"
                  size={"small"}
                  fullWidth={true}
                  register={register("postal_code")}
                />
              </Grid>
              <Grid item xs={12}>
                <Customfield
                  multiline
                  rows={4}
                  maxRows={10}
                  variant="outlined"
                  placeholder="Enter Address"
                  initialize={isLoading}
                  labelName="Address"
                  size={"small"}
                  fullWidth={true}
                  register={register("address")}
                />
              </Grid>

              <Grid item xs={12} md={8} lg={7}>
                <Grid container spacing={6}>
                  <CardHeader title={"Credit Card Details"} />
                  <Grid item xs={12}>
                    <Customfield
                      placeholder="Enter Card Number"
                      initialize={isLoading}
                      labelName="Credit Card Number"
                      size={"small"}
                      fullWidth={true}
                      register={register("credit_card_no")}
                    />
                  </Grid>
                  <br></br>
                  <Grid item xs={6} sm={4}>
                    <Customfield
                      placeholder="MM/YYYY"
                      initialize={isLoading}
                      labelName="Expiry Date"
                      size={"small"}
                      fullWidth={true}
                      register={register("credit_card_no")}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Customfield
                      placeholder="123"
                      initialize={isLoading}
                      labelName="CVV"
                      size={"small"}
                      fullWidth={true}
                      register={register("credit_card_no")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Customfield
                      placeholder="Enter name"
                      initialize={isLoading}
                      labelName="Name on Card"
                      size={"small"}
                      fullWidth={true}
                      register={register("credit_card_no")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  Back
                </Button>
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

export default StudentInfo;
