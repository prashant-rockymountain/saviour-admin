import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { FC, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
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
import Customfield from "../g_components/Customfield";
import CustomButton from "../g_components/CustomButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { successToast } from "../g_components/g_toaster";
import ApplicationController from "src/pages/all-students/controller";
import { LoadingButton } from "@mui/lab";
import GUpload from "../g_components/g_upload";
import CourseFinderController from "src/pages/course-finder/controller";
import { Record } from "immutable";
import { error } from "console";
import StepperFormController from "src/pages/stepperForm/controller";
// import GraduationController from "src/pages/graduation/controller";

export interface FormTypes {
  is_active: boolean;
  first_name: string;
  middle_name: string;
  last_name: string;
  passport_number: string;
  visa_rejection: boolean;
  visa_rejection_details?: visa_rejection_details;
  is_onshore: boolean;
  gender: "male" | "female";
  country: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  postal_code: string;
  address: string;
  cc_details?: {
    cc_number: string;
    cc_expiry: string;
    cc_cvv: string;
    cc_name: string;
  };
  // course_details: Record<string, string>;
  proficiency_tests: {
    ielts: {
      checked: boolean;
      overall: number | null;
      reading: number | null;
      speaking: number | null;
      writing: number | null;
      listening: number | null;
    };
    pte: {
      checked: boolean;
      overall: number | null;
      reading: number | null;
      speaking: number | null;
      writing: number | null;
      listening: number | null;
    };
    duolingo: {
      checked: boolean;
      overall: number | null;
      reading: number | null;
      speaking: number | null;
      writing: number | null;
      listening: number | null;
    };
    toefl: {
      checked: boolean;
      overall: number | null;
      reading: number | null;
      speaking: number | null;
      writing: number | null;
      listening: number | null;
    };
  };
  education_info: [Record<string, string>];
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
  documents: Record<string, string>;
}
interface visa_rejection_details {
  country: string;
  visa_type: string;
  month_year: string;
}

const ProfileAssessmentForm = ({
  editdata,
  id,
}: {
  editdata: FormTypes;
  id: string;
}) => {
  const applicationController = new ApplicationController();
  const locationController = new CourseFinderController();
  const stepperFormController = new StepperFormController();

  const [statesArray, setStatesArray] = useState<any[]>([]);
  const [cityArray, setCityArray] = useState<any[]>([]);
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
    phone: yup
      .string()
      .required("Mobile Number is required")
      .matches(/^\d{10}$/, "Mobile Number should be 10 digit long"),
    cc_details: yup.object({}),
    proficiency_tests: yup.object().shape({
      ielts: yup.object(),
      pte: yup.object(),
      toefl: yup.object(),
      duolingo: yup.object(),
    }),
    education_info: yup.array().of(
      yup.object().shape({
        level: yup.string().required("Please Select Level"),
        stream: yup.string().required("Please Select Stream"),
        passing_year: yup.string().required("Please Enter Passing Year"),
        result: yup.string().required("Please Enter Result"),
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
    documents: yup.object({
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
    }),
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
  const profileData: FormTypes = {
    is_active: editdata ? editdata?.is_active : true,
    first_name: editdata?.first_name || "",
    middle_name: editdata?.middle_name || "",
    last_name: editdata?.last_name || "",
    passport_number: editdata?.passport_number || "",
    visa_rejection: editdata ? editdata?.visa_rejection : false,
    visa_rejection_details: editdata?.visa_rejection_details || {
      country: "",
      month_year: "",
      visa_type: "",
    },
    is_onshore: editdata ? editdata?.is_onshore : false,
    gender: editdata?.gender || "male",
    country: editdata?.country || "",
    state: editdata?.state || "",
    city: editdata?.city || "",
    phone: editdata?.phone || "",
    email: editdata?.email || "",
    postal_code: editdata?.postal_code || "",
    address: editdata?.address || "",
    cc_details: editdata?.cc_details || {
      cc_number: "",
      cc_expiry: "",
      cc_cvv: "",
      cc_name: "",
    },
    // course_details: {
    //   country: "",
    //   province: "",
    //   institute: "",
    // },
    proficiency_tests: editdata?.proficiency_tests || {
      ielts: {
        checked: false,
        overall: null,
        reading: null,
        listening: null,
        writing: null,
        speaking: null,
      },
      pte: {
        checked: false,
        overall: null,
        reading: null,
        listening: null,
        writing: null,
        speaking: null,
      },
      toefl: {
        checked: false,
        overall: null,
        reading: null,
        listening: null,
        writing: null,
        speaking: null,
      },
      duolingo: {
        checked: false,
        overall: null,
        reading: null,
        listening: null,
        writing: null,
        speaking: null,
      },
    },
    education_info: editdata?.education_info || [education_obj],
    employment: editdata?.employment || [employment_obj],
    documents: editdata?.documents || {
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
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    watch,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...(profileData as FormTypes) },
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
  const onSubmit = (studentData: any) => {
    const { visa_rejection_details: visa_rejection_data, ...restData } =
      studentData;
    const data = {
      ...(studentData?.visa_rejection && {
        visa_rejection_details: visa_rejection_data,
      }),
      ...restData,
    };
    id ? mutate({ payload: data, id: id }) : mutate(data);
  };
  const router = useRouter();
  const { data, isLoading: locationLoading } = useQuery({
    queryKey: ["All_Locations"],
    queryFn: () =>
      locationController.getAllFilteredLocations({
        city: [],
        state: [],
        country: [],
      }),
  });
  const { data: levelData, isLoading: levelLoading } = useQuery({
    queryKey: ["All_streams"],
    queryFn: stepperFormController.getAllStream,
  });
  const isLoading = locationLoading;
  const countryList = data?.data?.data;

  const getCurrentCountry = (id: string) => {
    const currentCountry = countryList?.find(
      (item: Record<string, any>) => item._id === id
    );
    // console.log(currentCountry, "current", id);

    return currentCountry;
  };

  const getCurrentState = (country: string, state: string) => {
    const statesArray = getCurrentCountry(country)?.states;
    const currentState = statesArray?.find(
      (item: Record<string, any>) => item._id === state
    );
    return currentState;
  };

  const getCurrentCity = (country: string, state: string, city: string) => {
    const currentCity = getCurrentState(country, state)?.cities?.find(
      (item: Record<string, any>) => item._id === city
    );
    return currentCity;
  };

  const getStateArray = (name: keyof FormTypes) => {
    const matchedState = countryList?.find(
      (item: any) => item._id === watch(`${name}`)
    );
    // if (name == "country") setStatesArray(matchedState?.states);
    return matchedState?.states;
  };

  const getCityArray = () => {
    const statesArray = countryList?.find(
      (item: any) => item._id === watch("country")
    )?.states;
    const cities = statesArray?.find(
      (item: any) => item._id === getValues("state")
    )?.cities;
    return cities;
    // setCityArray(cities?.cities);
  };

  const getStreamArray = (id: string) => {
    const streamArray = levelData?.data?.find(
      (item: Record<string, any>) => id == item.education_level._id
    )?.streams;
    return streamArray;
  };

  // const getCurrentLevel = (id: string) => {
  //   const currentLevel = levelData?.data?.find(
  //     (item: Record<string, any>) => id == item.education_level._id
  //   );
  //   console.log(currentLevel,"currentLevel");

  //   return currentLevel;
  // };

  const proficiency_tests_array: Array<keyof test> = [
    "ielts",
    "pte",
    "toefl",
    "duolingo",
  ];

  // useEffect(() => {

  // }, [watch().state, countryList, statesArray]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["student-add"],
    mutationFn: id
      ? applicationController.updateStudent
      : applicationController.addStudent,
    onSuccess: (data) => {
      successToast({
        title: `${id ? "Updated Successfully" : "Added Successfully"}`,
      });
      queryClient.invalidateQueries({ queryKey: ["graduation"] });
      // router.push("/all-students");
      router.back();
    },
  });
  const values = watch();
  console.log(values, "student");

  const isInitialized = locationLoading;

  interface test {
    ielts: Record<string, any>;
    pte: Record<string, any>;
    toefl: Record<string, any>;
    duolingo: Record<string, any>;
  }

  console.log(editdata, "safdeditdata");

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
                      value={values.gender}
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
                      <Grid item xs={12} md={4}>
                        {isLoading ? (
                          <Skeleton variant="text" width={140} />
                        ) : (
                          <FormLabel>Country</FormLabel>
                        )}
                        {isLoading ? (
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={56}
                          />
                        ) : (
                          <Autocomplete
                            defaultValue={
                              !isLoading &&
                              getCurrentCountry(
                                values!.visa_rejection_details!.country!
                              )
                            }
                            sx={{ mt: 2 }}
                            options={countryList?.length > 0 ? countryList : []}
                            size="small"
                            onChange={(
                              event: React.SyntheticEvent,
                              value: any
                            ) => {
                              setValue(
                                "visa_rejection_details.country",
                                value?._id
                              );
                              clearErrors(["visa_rejection_details.country"]);
                            }}
                            loading={isLoading}
                            fullWidth
                            getOptionLabel={(option) =>
                              option?.name?.slice(0, 1).toUpperCase() +
                                option?.name?.slice(1) || ""
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Country"
                                helperText={
                                  errors.visa_rejection_details?.country
                                    ?.message
                                }
                                error={!!errors.visa_rejection_details?.country}
                              />
                            )}
                          />
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
                              // displayEmpty={true}
                              value={values.visa_rejection_details.visa_type}
                              sx={{ mt: 2 }}
                              {...register("visa_rejection_details.visa_type")}
                              // error={!!errors?.visa_rejection_details.visa_type}
                            >
                              <MenuItem value={"PR Visa"}>PR Visa</MenuItem>
                              <MenuItem value={"Student Visa"}>
                                Student Visa
                              </MenuItem>
                              <MenuItem value={"Visitor Visa"}>
                                Visitor Visa
                              </MenuItem>
                              <MenuItem value={"Spouse Visa"}>
                                Spouse Visa
                              </MenuItem>
                              <MenuItem value={"Business Visa"}>
                                Business Visa
                              </MenuItem>
                              <MenuItem value={"Other Visa"}>
                                Other Visa
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

              <Grid
                item
                xs={12}
                md={
                  getValues("state")?.length > 0
                    ? 4
                    : getValues("country")?.length > 0
                    ? 6
                    : 12
                }
              >
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Country</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Autocomplete
                    defaultValue={
                      countryList?.length > 0 &&
                      getCurrentCountry(values?.country)
                    }
                    sx={{ mt: 2 }}
                    options={countryList?.length > 0 ? countryList : []}
                    size="small"
                    onChange={(event: React.SyntheticEvent, value: any) => {
                      setValue("country", value?._id);
                      setValue("state", "");
                      setValue("city", "");
                      clearErrors(["country"]);
                    }}
                    loading={isLoading}
                    fullWidth
                    getOptionLabel={(option) =>
                      option?.name?.slice(0, 1).toUpperCase() +
                        option?.name?.slice(1) || ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Country "
                        helperText={errors.country?.message}
                        error={!!errors.country}
                      />
                    )}
                  />
                )}
              </Grid>

              {getValues("country")?.length > 0 && (
                <>
                  <Grid
                    item
                    md={getValues("state")?.length > 0 ? 4 : 6}
                    xs={12}
                  >
                    {isLoading ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={56}
                      />
                    ) : (
                      <>
                        <FormLabel>State</FormLabel>
                        <Autocomplete
                          defaultValue={
                            !isLoading &&
                            getCurrentState(values.country, values.state)
                          }
                          sx={{ mt: 2 }}
                          options={
                            getStateArray("country")?.length > 0
                              ? getStateArray("country")
                              : []
                          }
                          size="small"
                          noOptionsText={
                            getValues("country")
                              ? "State is not added yet"
                              : "Please Select Country"
                          }
                          onChange={(
                            event: React.SyntheticEvent,
                            value: any
                          ) => {
                            setValue("state", value?._id);
                            clearErrors(["state"]);
                          }}
                          fullWidth
                          getOptionLabel={(option) =>
                            getValues("country") === option?.country
                              ? option?.name.slice(0, 1).toUpperCase() +
                                option?.name.slice(1)
                              : ""
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select State"
                              error={!!errors.state}
                              helperText={errors.state?.message}
                            />
                          )}
                        />
                      </>
                    )}
                  </Grid>
                </>
              )}

              {values.state?.length > 0 && (
                <Grid item md={4} xs={12}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={56} />
                  ) : (
                    <>
                      <FormLabel>City</FormLabel>
                      <Autocomplete
                        sx={{ mt: 2 }}
                        defaultValue={
                          !isLoading &&
                          getCurrentCity(
                            values.country,
                            values.state,
                            values.city
                          )
                        }
                        options={
                          getCityArray()?.length > 0 ? getCityArray() : []
                        }
                        size="small"
                        noOptionsText={
                          getValues("state")
                            ? "city is not added yet"
                            : "Please Select state"
                        }
                        onChange={(event: React.SyntheticEvent, value: any) => {
                          setValue("city", value?._id);
                          clearErrors(["city"]);
                        }}
                        fullWidth
                        getOptionLabel={(option) =>
                          getValues("state") === option?.state &&
                          getValues("country") === option?.country
                            ? option?.name.slice(0, 1).toUpperCase() +
                              option?.name.slice(1)
                            : ""
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select City"
                            error={!!errors.city}
                            helperText={errors.city?.message}
                          />
                        )}
                      />
                    </>
                  )}
                </Grid>
              )}
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
          {/* <CardHeader title={"Course Details"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={4}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Country</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Autocomplete
                    defaultValue={currentCountry}
                    sx={{ mt: 2 }}
                    options={countryList?.length > 0 ? countryList : []}
                    size="small"
                    onChange={(event: React.SyntheticEvent, value: any) => {
                      setValue("course_details.country", value?._id);
                      clearErrors(["course_details.country"]);
                    }}
                    loading={isLoading}
                    fullWidth
                    getOptionLabel={(option) =>
                      option?.name?.slice(0, 1).toUpperCase() +
                        option?.name?.slice(1) || ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Country "
                        helperText={errors.course_details?.country?.message}
                        error={!!errors.course_details?.country}
                      />
                    )}
                  />
                )}
              </Grid>

              {getValues("course_details.country")?.length > 0 && (
                <>
                  <Grid
                    item
                    md={getValues("course_details.country")?.length > 0 ? 4 : 6}
                    xs={12}
                  >
                    {isLoading ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={56}
                      />
                    ) : (
                      <>
                        <FormLabel>Province</FormLabel>
                        <Autocomplete
                          defaultValue={currentState}
                          sx={{ mt: 2 }}
                          disablePortal
                          // {...register("state")}
                          options={
                            getStateArray("course_details.country")?.length > 0
                              ? getStateArray("course_details.country")
                              : []
                          }
                          size="small"
                          noOptionsText={
                            getValues("course_details.province")
                              ? "State is not added yet"
                              : "Please Select Country"
                          }
                          onChange={(
                            event: React.SyntheticEvent,
                            value: any
                          ) => {
                            setValue("course_details.province", value?._id);
                            clearErrors(["state"]);
                          }}
                          fullWidth
                          getOptionLabel={(option) =>
                            getValues("course_details.country") ===
                            option?.country
                              ? option?.name.slice(0, 1).toUpperCase() +
                                option?.name.slice(1)
                              : ""
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select State"
                              error={!!errors?.course_details?.province}
                              helperText={
                                errors?.course_details?.province?.message
                              }
                            />
                          )}
                        />
                      </>
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6} md={4}>
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
          </CardContent> */}
          <CardHeader title={"English Proficiency Info"} />
          <CardContent>
            <Grid container spacing={6}>
              {proficiency_tests_array.map(
                (item: keyof test, index: number) => (
                  <>
                    <Grid item xs={4} sm={2.5} md={2} lg={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked={
                              values.proficiency_tests[`${item}`]?.checked
                            }
                          />
                        }
                        label={item.toUpperCase()}
                        {...register(`proficiency_tests.${item}.checked`)}
                      />
                    </Grid>
                  </>
                )
              )}

              {proficiency_tests_array.map(
                (item: keyof test) =>
                  watch(`proficiency_tests.${item}.checked`) && (
                    <Grid item xs={12}>
                      <>
                        <CardHeader title={`${item.toUpperCase()}`} />
                        <Grid container gap={6}>
                          {[
                            "overall",
                            "reading",
                            "listening",
                            "writing",
                            "speaking",
                          ].map((typeI: string) => (
                            <Grid item xs={12} md={2}>
                              <Customfield
                                placeholder={`Enter ${typeI}`}
                                initialize={isLoading}
                                labelName={typeI.toUpperCase()}
                                size={"small"}
                                fullWidth={true}
                                type="number"
                                // helperText={
                                //   errors?.proficiency_tests?.[item]?.[typeI]
                                //     .message
                                // }
                                // error={
                                //   !!errors?.proficiency_tests?.[item]?.[typeI]
                                // }
                                register={register(
                                  // @ts-ignore
                                  `proficiency_tests.${item}.${typeI}`,
                                  { valueAsNumber: true }
                                )}
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <Divider sx={{ mt: 5 }} />
                      </>
                    </Grid>
                  )
              )}
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
                            value={values!.education_info[0].level}
                            // defaultValue={values.commission_type}
                            {...register(`education_info.${index}.level`)}
                            error={!!errors?.education_info?.[index]?.level}
                          >
                            {levelData?.data?.map(
                              (level: Record<string, any>) => (
                                <MenuItem
                                  value={`${level?.education_level?._id}`}
                                >
                                  {level.education_level?.program_type}
                                </MenuItem>
                              )
                            )}
                          </Select>
                          <FormHelperText error={true}>
                            {!!errors?.education_info?.[index]?.level &&
                              errors?.education_info?.[index].level.message}
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
                            value={values!.education_info[index].stream}
                            // defaultValue={values.commission_type}
                            {...register(`education_info.${index}.stream`)}
                            error={!!errors?.education_info?.[index]?.stream}
                          >
                            {getStreamArray(
                              values && values!.education_info[index]!.level
                            )?.map((stream: Record<string, any>) => (
                              <MenuItem value={`${stream._id}`}>
                                {stream.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText error={true}>
                            {errors?.education_info?.[index]?.stream &&
                              errors?.education_info?.[index]?.stream.message}
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
                        error={!!errors?.education_info?.[index]?.passing_year}
                        helperText={
                          errors?.education_info?.[index]?.passing_year?.message
                        }
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
                        error={!!errors?.education_info?.[index]?.result}
                        helperText={
                          errors?.education_info?.[index]?.result?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="No of Backlogs"
                        initialize={isLoading}
                        labelName="No of Backlogs"
                        size={"small"}
                        fullWidth={true}
                        type="number"
                        register={register(
                          `education_info.${index}.backlog_number`
                        )}
                        error={
                          !!errors?.education_info?.[index]?.backlog_number
                        }
                        helperText={
                          errors?.education_info?.[index]?.backlog_number
                            ?.message
                        }
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
                            error={!!errors?.education_info?.[index]?.type}
                          >
                            <MenuItem value={"on campus"}>ON CAMPUS</MenuItem>
                            <MenuItem value={"off campus"}>OFF CAMPUS</MenuItem>
                          </Select>
                          <FormHelperText error={true}>
                            {!!errors?.education_info?.[index]?.type &&
                              errors?.education_info?.[index]?.type?.message}
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
                        error={!!errors?.education_info?.[index]?.institute}
                        helperText={
                          errors?.education_info?.[index]?.institute?.message
                        }
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
                  value={values.documents.tenth}
                  name="documents.tenth"
                  labelName="10th Grade"
                  initialize={false}
                  error={errors.documents?.tenth}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.tweleveth}
                  name="documents.tweleveth"
                  labelName="12th Grade"
                  initialize={isInitialized}
                  error={errors.documents?.tweleveth}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.bachelor_n_marksheet}
                  name="documents.bachelor_n_marksheet"
                  labelName="Bachelor Degree & Marksheet"
                  initialize={isInitialized}
                  error={errors.documents?.bachelor_n_marksheet}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.master_n_marksheet}
                  name="documents.master_n_marksheet"
                  labelName="Master Degree & Marksheet"
                  initialize={isInitialized}
                  error={errors.documents?.master_n_marksheet}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.diploma_marksheet}
                  name="documents.diploma_marksheet"
                  labelName="Diploma Marksheet"
                  initialize={isInitialized}
                  error={errors.documents?.diploma_marksheet}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.english_proficiency}
                  name="documents.english_proficiency"
                  labelName="English Proficiency Score"
                  initialize={isInitialized}
                  error={errors.documents?.english_proficiency}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.passport}
                  name="documents.passport"
                  labelName="Passport Copy(1st & Last Page)"
                  initialize={isInitialized}
                  error={errors.documents?.passport}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.combined}
                  name="documents.combined"
                  labelName="Combined - All Documents"
                  initialize={isInitialized}
                  error={errors.documents?.combined}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.backlog_certificate}
                  name="documents.backlog_certificate"
                  labelName="Backlog Certificate"
                  initialize={isInitialized}
                  error={errors.documents?.backlog_certificate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.admit_card}
                  name="documents.admit_card"
                  labelName="Admit Card (12th Grade)"
                  initialize={isInitialized}
                  error={errors.documents?.admit_card}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.visa}
                  name="documents.visa"
                  labelName="Visa Form"
                  initialize={isInitialized}
                  error={errors.documents?.visa}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.family_info}
                  name="documents.family_info"
                  labelName="Family Information"
                  initialize={isInitialized}
                  error={errors.documents?.family_info}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <GUpload
                  setValue={setValue}
                  value={values.documents.client_info}
                  name="documents.client_info"
                  labelName="Client Information ( IT Papers, Experience letter, Bank Certificate and Statement, Financial Documents with CA Report, SOP (if needed))"
                  initialize={isInitialized}
                  error={errors.documents?.client_info}
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
                  defaultChecked={values?.is_active!}
                />
              </Grid>

              <Grid item sm={6} textAlign={"right"}>
                <CustomButton
                  variant="contained"
                  sx={{ width: 150, float: "right" }}
                  type="submit"
                  label={id ? "Update" : "Submit"}
                  initialize={isInitialized}
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

export default ProfileAssessmentForm;
