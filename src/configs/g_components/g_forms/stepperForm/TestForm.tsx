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
interface TestFormTypes {
  ielts: boolean;
  pte: boolean;
  toefl: boolean;
  duolingo: boolean;
}
const TestForm = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [testFormData, setTestFormData] = useState<TestFormTypes>({
    ielts: false,
    pte: false,
    toefl: false,
    duolingo: false,
  });
  const isLoading = false;
  const schema = yup.object().shape({
    ielts: yup.bool(),
    pte: yup.bool(),
    toefl: yup.bool(),
    duolingo: yup.bool(),
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
    defaultValues: { ...testFormData },
    resolver: yupResolver(schema),
  });
  const values = watch();
  console.log(values, "register");
  const onSumit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit(onSumit)}>
        <Card>
          <CardHeader title="English Proficiency Info" variant={"body1"} />
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

export default TestForm;
