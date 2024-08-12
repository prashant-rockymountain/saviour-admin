import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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
interface DocumentsFormTypes {
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
}
const DocumentsForm = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [documentsFormData, setDocumentsFormData] =
    useState<DocumentsFormTypes>({
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
    });
  const isLoading = false;
  const schema = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { ...documentsFormData },
    resolver: yupResolver(schema),
  });
  const values = watch();
  // console.log(values, "register12");
  const onSumit = () => {}; 
  return (
    <>
      <form onSubmit={handleSubmit(onSumit)}>
        <Card>
          <CardHeader title="Documents" variant={"body1"} />
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
                <Button
                  variant="contained"
                  // onClick={() => setActiveStep((prev) => prev + 1)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default DocumentsForm;
