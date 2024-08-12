import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup";
import {
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
  company: string;
  designation: string;
  start_date: string;
  no_of_years: string;
  is_currently_working: boolean;
  end_date: string;
}
interface EmploymentInfoTypes {
  education_info: [education_obj];
}
const EmploymentInfo = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const education_obj = {
    company: "",
    designation: "",
    start_date: "",
    no_of_years: "",
    is_currently_working: false,
    end_date: "",
  };
  const [employmentData, setEmploymentData] = useState<EmploymentInfoTypes>({
    education_info: [education_obj],
  });
  const isLoading = false;
  const schema = yup.object().shape({
    education_info: yup.array().of(
      yup.object().shape({
        company: yup.string(),
        designation: yup.string(),
        start_date: yup.string(),
        no_of_years: yup.string(),
        is_currently_working: yup.bool(),
        end_date: yup.string(),
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
    defaultValues: { ...employmentData },
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
          <CardHeader title="Employment Info" variant={"body1"} />
          <CardContent>
            <Grid container spacing={6}>
              {fields?.map((item: Record<string, any>, index: number) => (
                <Grid item xs={12}>
                  <Grid container spacing={6} mb={3}>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="Company"
                        initialize={isLoading}
                        labelName="Company"
                        size={"small"}
                        fullWidth={true}
                        register={register(`education_info.${index}.company`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="Designation"
                        initialize={isLoading}
                        labelName="Designation"
                        size={"small"}
                        fullWidth={true}
                        register={register(
                          `education_info.${index}.designation`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        type="date"
                        initialize={isLoading}
                        labelName="Start Date"
                        size={"small"}
                        fullWidth={true}
                        register={register(
                          `education_info.${index}.start_date`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        placeholder="no of years"
                        initialize={isLoading}
                        labelName="No of years"
                        size={"small"}
                        fullWidth={true}
                        register={register(
                          `education_info.${index}.no_of_years`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} mt={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Currently Working?"
                        {...register(
                          `education_info.${index}.is_currently_working`
                        )}
                      />
                    </Grid>
                    {/* {!values.education_info[index].is_currently_working && ( */}
                    <Grid item xs={12} sm={4} md={3}>
                      <Customfield
                        disabled={
                          values.education_info[index].is_currently_working
                        }
                        variant={
                          values.education_info[index].is_currently_working
                            ? "filled"
                            : "outlined"
                        }
                        type="date"
                        initialize={isLoading}
                        labelName="End Date"
                        size={"small"}
                        fullWidth={true}
                        register={register(`education_info.${index}.end_date`)}
                      />
                    </Grid>
                    {/* )} */}
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

export default EmploymentInfo;
