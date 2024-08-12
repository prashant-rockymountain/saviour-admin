import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  FormControl,
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
import { useFieldArray, useForm } from "react-hook-form";
import Customfield from "src/configs/g_components/Customfield";
import * as yup from "yup";
interface education_obj {
  level: string;
  stream: string;
  passing_year: string;
  result: string;
  no_of_backlogs: string;
  type: string;
  institute: string;
}
interface EducationInfoTypes {
  education_info: [education_obj];
}
const EducationInfo = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const education_obj = {
    level: "",
    stream: "",
    passing_year: "",
    result: "",
    no_of_backlogs: "",
    type: "",
    institute: "",
  };
  const [educationData, setEducationData] = useState<EducationInfoTypes>({
    education_info: [education_obj],
  });
  const isLoading = false;
  const schema = yup.object().shape({
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
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: { ...educationData },
    resolver: yupResolver(schema),
  });
  const values = watch();
  const { append, remove, fields } = useFieldArray({
    name: "education_info",
    control,
  });
  const onSubmit = () => {
    setActiveStep((prev) => prev + 1);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Education Info" variant={"body1"} />
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
                            value={educationData.education_info[0].level}
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
                        register={register("name")}
                      />
                    </Grid>
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
                  onClick={() => setActiveStep((prev) => prev + 1)}
                >
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

export default EducationInfo;
