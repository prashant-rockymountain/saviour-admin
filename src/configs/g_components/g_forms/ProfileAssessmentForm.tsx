import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { FC, useRef, useState } from "react";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Customfield from "../Customfield";
import CustomButton from "../CustomButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { successToast } from "../g_toaster";
import ApplicationController from "src/pages/all-application/controller";
import { LoadingButton } from "@mui/lab";
import GUpload from "../g_upload";
import CourseFinderController from "src/pages/course-finder/controller";
// import GraduationController from "src/pages/graduation/controller";

export interface FormTypes {
  is_active: boolean;
  first_name: string;
  middle_name: string;
  last_name: string;
  passport_number: string;
  visa_rejection: boolean;
  visa_rejection_details?: {
    country: string;
    month_year: string;
    visa_type: string;
  };
  is_onshore: boolean;
  gender: "male" | "female";
  country: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  postal_code: string;
  address: string;
  cc_details: {
    cc_number: string;
    cc_expiry: string;
    cc_cvv: number;
    cc_name: string;
  };
  course_details: {
    country: string;
    province: string;
    institute: string;
  };
  proficiency_tests: {
    ielts: boolean;
    pte: boolean;
    toefl: boolean;
    duolingo: boolean;
  };
  education_info: [
    {
      level: string;
      stream: string;
      passing_year: number;
      result: string;
      backlog_number: number;
      type: string;
      institute: string;
    }
  ];
  employment: [
    {
      company: string;
      designation: string;
      start_date: string;
      end_date?: string;
      experience: string;
      is_working: boolean;
    }
  ];
  tenth: Blob;
  tweleveth: Blob;
  bachelor_n_marksheet: Blob;
  master_n_marksheet: Blob;
  diploma_marksheet: Blob;
  english_proficiency: Blob;
  passport: Blob;
  combined: Blob;
  backlog_certificate?: Blob;
  admit_card: Blob;
  visa: Blob;
  family_info: Blob;
  client_info?: Blob;

  // study_area: Array<studyAreaInterface>;
}
interface editformdata {
  editdata: FormTypes;
  id: string;
}
const ProfileAssessmentForm: FC<editformdata> = ({ editdata, id }) => {
  //   const graduationController = new GraduationController();
  const applicationController = new ApplicationController();
  const locationController = new CourseFinderController();
  const schema = yup.object().shape({
    is_active: yup.bool(),
    first_name: yup
      .string()
      .required("First name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain letters only"),
    middle_name: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Name must contain letters only"),
    last_name: yup
      .string()
      .required("last name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name must contain letters only"),
    passport_number: yup.string().required("Passport number is required"),
    gender: yup.string().required("Please Select Gender"),
    is_onshore: yup.bool(),
    visa_rejection: yup.bool(),
    visa_rejection_details: yup.object().shape({
      country: yup.string().when("visa_rejection", {
        is: (val: boolean) => val === true,
        then: () => yup.string().required("Please Select Country"),
      }),
      month_year: yup.string().when("visa_rejection", {
        is: (val: boolean) => val === true,
        then: () => yup.string().required("Please Enter Month Year"),
      }),
      visa_type: yup.string().when("visa_rejection", {
        is: (val: boolean) => val === true,
        then: () => yup.string().required("Please Select Visa type"),
      }),
    }),
    country: yup.string().required("Please Select Country"),
    state: yup.string().required("Please Select State"),
    city: yup.string().required("Please Select City"),
    postal_code: yup.string().required("Postal Code is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("First name is required"),
    cc_details: yup.object({
      cc_number: yup.string(),
      cc_expiry: yup.string(),
      cc_cvv: yup.number(),
      cc_name: yup.string(),
    }),
    course_details: yup.object({
      country: yup.string().required("First name is required"),
      province: yup.string().required("First name is required"),
      institute: yup.string().required("First name is required"),
    }),
    proficiency_tests: yup.object({
      ielts: yup.bool(),
      pte: yup.bool(),
      toefl: yup.bool(),
      duolingo: yup.bool(),
    }),
    education_info: yup.array().of(
      yup.object().shape({
        level: yup.string().required("Please Select Level"),
        stream: yup.string().required("Please Select Stream"),
        passing_year: yup.string().required("Please Enter Passing Year"),
        result: yup.string().required("Please Enter Result"),
        backlog_number: yup.string(),
        type: yup.string().required("Please Select Type"),
        institute: yup.string().required("Please Select Institute"),
      })
    ),
    employment: yup.array().of(
      yup.object().shape({
        company: yup.string(),
        designation: yup.string(),
        start_date: yup.string(),
        end_date: yup.string(),
        experience: yup.string(),
        is_working: yup.bool(),
      })
    ),

    tenth: yup.string(),
    tweleveth: yup.string(),
    bachelor_n_marksheet: yup.string(),
    master_n_marksheet: yup.string(),
    diploma_marksheet: yup.string(),
    english_proficiency: yup.string(),
    passport: yup.string(),
    combined: yup.string(),
    backlog_certificate: yup.string(),
    admit_card: yup.string(),
    visa: yup.string(),
    family_info: yup.string(),
    client_info: yup.string(),
  });
  const education_obj = {
    level: "",
    stream: "",
    passing_year: "",
    result: "",
    backlog_number: "",
    type: "",
    institute: "",
  };
  const employment_obj = {
    company: "",
    designation: "",
    start_date: "",
    end_date: "",
    experience: "",
    is_working: false,
  };
  // const [profileData, setProfileData] = useState({
  const profileData = {
    is_active: true,
    first_name: "",
    middle_name: "",
    last_name: "",
    passport_number: "",
    visa_rejection: false,
    visa_rejection_details: {
      country: "",
      month_year: "",
      visa_type: "",
    },
    is_onshore: false,
    gender: "",
    country: "india",
    state: "",
    city: "",
    phone: "",
    email: "",
    postal_code: "",
    address: "",
    cc_details: {
      cc_number: "",
      cc_expiry: "",
      cc_cvv: "",
      cc_name: "",
    },
    course_details: {
      country: "",
      province: "",
      institute: "",
    },
    proficiency_tests: {
      ielts: false,
      pte: false,
      toefl: false,
      duolingo: false,
    },
    education_info: [education_obj],
    employment: [employment_obj],
    tenth: "",
    tweleveth: "",
    bachelor_n_marksheet: "",
    master_n_marksheet: "",
    diploma_marksheet: "",
    english_proficiency: "",
    passport: "",
    combined: "",
    backlog_certificate: "",
    admit_card: "",
    visa: "",
    family_info: "",
    client_info: "",
  };
  // });
  // console.log(profileData, "profile");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...profileData },
  });
  const {
    append: empAppend,
    remove: empRemove,
    fields: empField,
  } = useFieldArray({
    name: "employment",
    control,
  });
  const {
    append: eduAppend,
    remove: eduRemove,
    fields: eduField,
  } = useFieldArray({
    name: "education_info",
    control,
  });

  const queryClient = useQueryClient();
  const onSubmit = (data: FormTypes) => {
    mutate(data);
  };
  const isLoading = false;
  const router = useRouter();
  const {} = useQuery({ queryFn: locationController.getAllFilteredLocations });
  const { mutate, isPending } = useMutation({
    mutationKey: ["student-add"],
    mutationFn: applicationController.addStudent,
    onSuccess: () => {
      successToast({
        title: `${id ? "Updated Successfully" : "Added Successfully"}`,
      });
      queryClient.invalidateQueries({ queryKey: ["graduation"] });
      // router.push("/graduation");
    },
  });
  const values = watch();
  const isInitialized = false;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title={"Student Info"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter First name"
                  initialize={isLoading}
                  labelName="First Name"
                  size={"small"}
                  fullWidth={true}
                  helperText={errors.first_name?.message}
                  error={!!errors.first_name}
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
                  helperText={errors.last_name?.message}
                  error={!!errors.last_name}
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
                  helperText={errors.passport_number?.message}
                  error={!!errors.passport_number}
                  register={register("passport_number")}
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
                      error={!!errors.gender}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.gender && errors.gender.message}
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
                  control={<Checkbox defaultChecked={values.visa_rejection} />}
                  label="Visa Rejection"
                  {...register("visa_rejection")}
                />
              </Grid>
              {values.visa_rejection && (
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
                              {...register("visa_rejection_details.country")}
                              error={!!errors?.visa_rejection_details?.country}
                            >
                              <MenuItem value={"fixed"}>Fixed</MenuItem>
                              <MenuItem value={"percentage"}>
                                Percentage
                              </MenuItem>
                            </Select>
                            <FormHelperText error={true}>
                              {errors?.visa_rejection_details?.country &&
                                errors.visa_rejection_details.country.message}
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
                          error={!!errors?.visa_rejection_details?.month_year}
                          helperText={
                            errors?.visa_rejection_details?.month_year?.message
                          }
                          register={register(
                            "visa_rejection_details.month_year"
                          )}
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
                              {...register("visa_rejection_details.visa_type")}
                              // error={!!errors?.visa_rejection_details.visa_type}
                            >
                              <MenuItem value={"fixed"}>Fixed</MenuItem>
                              <MenuItem value={"percentage"}>
                                Percentage
                              </MenuItem>
                            </Select>
                            <FormHelperText error={true}>
                              {errors?.visa_rejection_details?.visa_type &&
                                errors.visa_rejection_details.visa_type.message}
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
                      sx={{ mt: 2 }}
                      {...register("country")}
                      error={!!errors.country}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
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
                  register={register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Customfield
                  placeholder="Enter Email Id"
                  initialize={isLoading}
                  labelName="Email"
                  size={"small"}
                  fullWidth={true}
                  register={register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
                  error={!!errors.postal_code}
                  helperText={errors.postal_code?.message}
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
                  error={!!errors.address}
                  helperText={errors.address?.message}
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
                      register={register("cc_details.cc_number")}
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
                      register={register("cc_details.cc_expiry")}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Customfield
                      placeholder="123"
                      initialize={isLoading}
                      labelName="CVV"
                      size={"small"}
                      fullWidth={true}
                      register={register("cc_details.cc_cvv")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Customfield
                      placeholder="Enter name"
                      initialize={isLoading}
                      labelName="Name on Card"
                      size={"small"}
                      fullWidth={true}
                      register={register("cc_details.cc_name")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardHeader title={"Course Details"} />
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
                      //   value={courseData.country}
                      // defaultValue={values.commission_type}
                      {...register("course_details.country")}
                      error={!!errors.course_details?.country}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors?.course_details?.country &&
                        errors.course_details.country.message}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Province</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      //   value={courseData.country}
                      // defaultValue={values.commission_type}
                      {...register("course_details.province")}
                      error={!!errors.course_details?.province}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.course_details?.province &&
                        errors.course_details?.province.message}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Name of Institute</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="text" width="100%" height={45} />
                ) : (
                  <FormControl fullWidth>
                    <Select
                      size={"small"}
                      sx={{ mt: 2 }}
                      //   value={courseData.country}
                      // defaultValue={values.commission_type}
                      {...register("course_details.institute")}
                      error={!!errors.course_details?.institute}
                    >
                      <MenuItem value={"fixed"}>Fixed</MenuItem>
                      <MenuItem value={"percentage"}>Percentage</MenuItem>
                    </Select>
                    <FormHelperText error={true}>
                      {errors.course_details?.institute &&
                        errors.course_details?.institute.message}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
            </Grid>
            <Divider sx={{ mt: 5 }} />
          </CardContent>
          <CardHeader title={"English Proficiency Info"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked={values.proficiency_tests.ielts} />
                  }
                  label="IELTS"
                  {...register("proficiency_tests.ielts")}
                />
              </Grid>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked={values.proficiency_tests.pte} />
                  }
                  label="PTE"
                  {...register("proficiency_tests.pte")}
                />
              </Grid>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked={values.proficiency_tests.toefl} />
                  }
                  label="TOEFL"
                  {...register("proficiency_tests.toefl")}
                />
              </Grid>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={values.proficiency_tests.duolingo}
                    />
                  }
                  label="DUOLINGO"
                  {...register("proficiency_tests.duolingo")}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 5 }} />
          </CardContent>
          <CardHeader title={"Education Info"} />
          <CardContent>
            <Grid container spacing={6}>
              {eduField?.map((item: Record<string, any>, index: number) => (
                <Grid item xs={12} key={index}>
                  <Grid container spacing={6} mb={3}>
                    <Grid item xs={12} sm={4} md={3}>
                      {isLoading ? (
                        <Skeleton variant="text" width={140} />
                      ) : (
                        <FormLabel>Level</FormLabel>
                      )}
                      {isLoading ? (
                        <Skeleton variant="text" width="100%" height={45} />
                      ) : (
                        <FormControl fullWidth>
                          <Select
                            size={"small"}
                            sx={{ mt: 2 }}
                            // value={educationData.education_info[0].level}
                            // defaultValue={values.commission_type}
                            {...register(`education_info.${index}.level`)}
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
                    <Grid item xs={12} sm={4} md={3}>
                      {isLoading ? (
                        <Skeleton variant="text" width={140} />
                      ) : (
                        <FormLabel>Stream</FormLabel>
                      )}
                      {isLoading ? (
                        <Skeleton variant="text" width="100%" height={45} />
                      ) : (
                        <FormControl fullWidth>
                          <Select
                            size={"small"}
                            sx={{ mt: 2 }}
                            // value={`education_info.${index}.stream`}
                            // defaultValue={values.commission_type}
                            {...register(`education_info.${index}.stream`)}
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
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="passing Year"
                        initialize={isLoading}
                        labelName="Passing Year"
                        size={"small"}
                        fullWidth={true}
                        register={register(
                          `education_info.${index}.passing_year`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="Result"
                        initialize={isLoading}
                        labelName="Result"
                        size={"small"}
                        fullWidth={true}
                        register={register(`education_info.${index}.result`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="No of Backlogs"
                        initialize={isLoading}
                        labelName="No of Backlogs"
                        size={"small"}
                        fullWidth={true}
                        register={register(
                          `education_info.${index}.backlog_number`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      {isLoading ? (
                        <Skeleton variant="text" width={140} />
                      ) : (
                        <FormLabel>Type</FormLabel>
                      )}
                      {isLoading ? (
                        <Skeleton variant="text" width="100%" height={45} />
                      ) : (
                        <FormControl fullWidth>
                          <Select
                            size={"small"}
                            sx={{ mt: 2 }}
                            // value={values.education_info[index].type}
                            // defaultValue={values.commission_type}
                            {...register(`education_info.${index}.type`)}
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
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="Institute"
                        initialize={isLoading}
                        labelName="Institute"
                        size={"small"}
                        fullWidth={true}
                        register={register(`education_info.${index}.institute`)}
                      />
                    </Grid>
                    {/* @ts-ignore */}
                    {values.education_info.length !== 1 && !item._id && (
                      <Grid item xs={3} sm={1.5} lg={0.75} mt={6}>
                        <Fab
                          size="small"
                          color="primary"
                          onClick={() => eduRemove(index)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Grid>
                    )}
                    {/* @ts-ignore */}
                    {index == values.education_info.length - 1 && (
                      <Grid item xs={3} sm={1.5} lg={0.75} mt={6}>
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => eduAppend(education_obj!)}
                        >
                          <AddIcon />
                        </Fab>
                      </Grid>
                    )}
                  </Grid>
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </CardContent>

          <CardHeader title={"Employment Info"} />
          <CardContent>
            <Grid container spacing={6}>
              {empField?.map((item: Record<string, any>, index: number) => (
                <Grid item xs={12} key={index}>
                  <Grid container spacing={6} mb={3}>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="Company"
                        initialize={isLoading}
                        labelName="Company"
                        size={"small"}
                        fullWidth={true}
                        register={register(`employment.${index}.company`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="Designation"
                        initialize={isLoading}
                        labelName="Designation"
                        size={"small"}
                        fullWidth={true}
                        register={register(`employment.${index}.designation`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        type="date"
                        initialize={isLoading}
                        labelName="Start Date"
                        size={"small"}
                        fullWidth={true}
                        register={register(`employment.${index}.start_date`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="no of years"
                        initialize={isLoading}
                        labelName="No of years"
                        size={"small"}
                        fullWidth={true}
                        register={register(`employment.${index}.experience`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} mt={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Currently Working?"
                        {...register(`employment.${index}.is_working`)}
                      />
                    </Grid>
                    {/* {!values.education_info[index].is_currently_working && ( */}
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        disabled={values.employment![index].is_working}
                        variant={
                          values.employment![index].is_working
                            ? "filled"
                            : "outlined"
                        }
                        type="date"
                        initialize={isLoading}
                        labelName="End Date"
                        size={"small"}
                        fullWidth={true}
                        register={register(`employment.${index}.end_date`)}
                      />
                    </Grid>
                    {/* )} */}
                    {/* @ts-ignore */}
                    {values.employment.length !== 1 && !item._id && (
                      <Grid item xs={3} sm={1.5} lg={0.75} mt={6}>
                        <Fab
                          size="small"
                          color="primary"
                          onClick={() => empRemove(index)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Grid>
                    )}
                    {/* @ts-ignore */}
                    {index == values.employment.length - 1 && (
                      <Grid item xs={3} sm={1.5} lg={0.75} mt={6}>
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => empAppend(employment_obj)}
                        >
                          <AddIcon />
                        </Fab>
                      </Grid>
                    )}
                  </Grid>
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardHeader title={"Documents"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.tenth}
                  name="tenth"
                  labelName="10th Grade"
                  initialize={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.tweleveth}
                  name="tweleveth"
                  labelName="12th Grade"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.bachelor_n_marksheet}
                  name="bachelor_n_marksheet"
                  labelName="Bachelor Degree & Marksheet"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.master_n_marksheet}
                  name="master_n_marksheet"
                  labelName="Master Degree & Marksheet"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.diploma_marksheet}
                  name="diploma_marksheet"
                  labelName="Diploma Marksheet"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.english_proficiency}
                  name="english_proficiency"
                  labelName="English Proficiency Score"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.passport}
                  name="passport"
                  labelName="Passport Copy(1st & Last Page)"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.combined}
                  name="combined"
                  labelName="Combined - All Documents"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.backlog_certificate}
                  name="backlog_certificate"
                  labelName="Backlog Certificate"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.admit_card}
                  name="admit_card"
                  labelName="Admit Card (12th Grade)"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.visa}
                  name="visa"
                  labelName="Visa Form"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.family_info}
                  name="family_info"
                  labelName="Family Information"
                  initialize={isInitialized}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.client_info}
                  name="client_info"
                  labelName="Client Information ( IT Papers, Experience letter, Bank Certificate and Statement, Financial Documents with CA Report, SOP (if needed))"
                  initialize={isInitialized}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <FormLabel>Status</FormLabel>
                <Switch
                  {...register("is_active")}
                  defaultChecked={values.is_active}
                />
              </Grid>

              <Grid item sm={6} textAlign={"right"}>
                <CustomButton
                  variant="contained"
                  sx={{ width: 150, float: "right" }}
                  type="submit"
                  label={id ? "Update" : "Submit"}
                  initialize={isInitialized}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default ProfileAssessmentForm;
