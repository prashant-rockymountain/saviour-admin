import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { FC, useState } from "react";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
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
} from "@mui/material";
import Customfield from "../Customfield";
import CustomButton from "../CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { successToast } from "../g_toaster";
// import GraduationController from "src/pages/graduation/controller";

export interface FormTypes {
  is_active: boolean;
  first_name: string;
  middle_name: string;
  last_name: string;
  passport: string;
  country: string;
  ielts: boolean;
  pte: boolean;
  toefl: boolean;
  duolingo: boolean;
  grade_10th: any;
  grade_12th: any;
  bachelor: any;
  master: any;
  diploma: any;
  english_proficiency_score: any;
  passport_copy: any;
  combined: any;
  backlog_certificate: any;
  admit_grade_12th: any;
  // study_area: Array<studyAreaInterface>;
}
interface editformdata {
  editdata: FormTypes;
  id: string;
}
const ProfileAssessmentForm: FC<editformdata> = ({ editdata, id }) => {
  //   const graduationController = new GraduationController();
  const schema = yup.object().shape({
    is_active: yup.bool(),
    first_name: yup.string().required("First name is required"),
    middle_name: yup.string(),
    last_name: yup.string(),
    passport: yup.string(),
    country: yup.string(),
    ielts: yup.bool(),
    pte: yup.bool(),
    toefl: yup.bool(),
    duolingo: yup.bool(),
    education_info: yup.array().of(
      yup.object().shape({
        level: yup.string(),
        stream: yup.string(),
        passing_year: yup.string(),
        result: yup.string(),
        no_of_backlogs: yup.string(),
        type: yup.string(),
        institute: yup.string(),
      })
    ),
    grade_10th: yup.string(),
    grade_12th: yup.string(),
    bachelor: yup.string(),
    master: yup.string(),
    diploma: yup.string(),
    english_proficiency_score: yup.string(),
    passport_copy: yup.string(),
    combined: yup.string(),
    backlog_certificate: yup.string(),
    admit_grade_12th: yup.string(),
  });
  const education_obj = {
    level: "",
    stream: "",
    passing_year: "",
    result: "",
    no_of_backlogs: "",
    type: "",
    institute: "",
    grade_10th: "",
    grade_12th: "",
    bachelor: "",
    master: "",
    diploma: "",
    english_proficiency_score: "",
    passport_copy: "",
    combined: "",
    backlog_certificate: "",
    admit_grade_12th: "",
  };
  const [profileData, setProfileData] = useState({
    is_active: false,
    first_name: "",
    middle_name: "",
    last_name: "",
    passport: "",
    country: "",
    ielts: false,
    pte: false,
    toefl: false,
    duolingo: false,
    education_info: [education_obj],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...profileData },
  });
  const { append, remove, fields } = useFieldArray({
    name: "education_info",
    control,
  });
  const queryClient = useQueryClient();
  const onSubmit = (data: any) => {
    // mutate({ payload: { ...data }, ...(editdata && { id: id }) });
  };
  const isLoading = false;
  const router = useRouter();

  //   const { mutate, isPending } = useMutation({
  //     mutationKey: ["graduation-add"],
  //     mutationFn: id
  //       ? graduationController.editGraduationList
  //       : graduationController.addGraduationList,
  //     onSuccess: () => {
  //       successToast({
  //         title: `${id ? "Updated Successfully" : "Added Successfully"}`,
  //       });
  //       queryClient.invalidateQueries({ queryKey: ["graduation"] });
  //       router.push("/graduation");
  //     },
  //   });

  const values = getValues();
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
            </Grid>
            <Divider sx={{ mt: 5 }} />
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
                      {...register("country")}
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
                      {...register("country")}
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
                      {...register("country")}
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
            </Grid>
            <Divider sx={{ mt: 5 }} />
          </CardContent>
          <CardHeader title={"English Proficiency Info"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={values.ielts} />}
                  label="IELTS"
                  {...register("ielts")}
                />
              </Grid>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={values.pte} />}
                  label="PTE"
                  {...register("pte")}
                />
              </Grid>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={values.toefl} />}
                  label="TOEFL"
                  {...register("toefl")}
                />
              </Grid>
              <Grid item xs={4} sm={2.5} md={2} lg={1}>
                <FormControlLabel
                  control={<Checkbox defaultChecked={values.duolingo} />}
                  label="DUOLINGO"
                  {...register("duolingo")}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 5 }} />
          </CardContent>
          <CardHeader title={"Education Info"} />
          <CardContent>
            <Grid container spacing={6}>
              {fields?.map((item: Record<string, any>, index: number) => (
                <Grid item xs={12}>
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
                            value={`education_info.${index}.stream`}
                            // defaultValue={values.commission_type}
                            {...register("education_info")}
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
                          `education_info.${index}.no_of_backlogs`
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
                          onClick={() => remove(index)}
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
                          onClick={() => append(education_obj)}
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
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="10th Grade"
                  register={register("grade_10th")}
                  //   startIcon={<CloudUploadIcon />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="12th Grade"
                  register={register("grade_12th")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Bachelor Degree & Marksheet"
                  register={register("bachelor")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Master Degree & Marksheet"
                  register={register("master")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Diploma Marksheet"
                  register={register("diploma")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="English Proficiency Score"
                  register={register("english_proficiency_score")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Passport Copy(1st & Last Page)"
                  register={register("passport_copy")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Combined - All Documents"
                  register={register("combined")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Backlog Certificate"
                  register={register("backlog_certificate")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Admit Card (12th Grade)"
                  register={register("admit_grade_12th")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Visa Form"
                  register={register("admit_grade_12th")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Customfield
                  type="file"
                  initialize={false}
                  size={"small"}
                  fullWidth={true}
                  labelName="Family Information"
                  register={register("admit_grade_12th")}
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
