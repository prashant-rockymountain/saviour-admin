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
  ielts: string;
  pte: string;
  toefl: string;
  duolingo: string;
}
const TestForm = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [courseData, setcourseData] = useState<TestFormTypes>({
    ielts: "",
    pte: "",
    toefl: "",
    duolingo: "",
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
    defaultValues: { ...courseData },
    resolver: yupResolver(schema),
  });
  const values = watch();
  console.log(values, "register");

  return (
    <>
      <Card>
        <CardHeader title="English Proficiency Info" variant={"body1"} />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item sm={4} md={2} mt={7}>
              <FormControlLabel
                control={<Checkbox defaultChecked={values.ielts} />}
                label="IELTS"
                {...register("ielts")}
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
    </>
  );
};

export default TestForm;
