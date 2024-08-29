import { yupResolver } from "@hookform/resolvers/yup";
import { CheckBox } from "@mui/icons-material";
import {
  Autocomplete,
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
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Customfield from "src/configs/g_components/Customfield";
import ApplicationController from "src/pages/all-application/controller";
import CourseFinderController from "src/pages/course-finder/controller";
import * as yup from "yup";
import { ISchema } from "yup";
interface courseDetailsTypes {
  student_info: Record<string, any> | string;
}
const StudentInfo = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [courseData, setcourseData] = useState<courseDetailsTypes>({
    student_info: "",
  });
  const StudentController = new ApplicationController();
  const {
    data: ApplicationData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["Application", "TrueApplicationList"],
    queryFn: StudentController.getALLStudent,
  });

  const schema = yup.object().shape({
    student_info: yup.object({}),
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
  console.log(values, "srhn");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Student Info" variant={"body1"} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                {isLoading ? (
                  <Skeleton variant="text" width={140} />
                ) : (
                  <FormLabel>Select Student</FormLabel>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={56} />
                ) : (
                  <Autocomplete
                    // defaultValue={[]}
                    sx={{ mt: 2 }}
                    options={!isLoading && ApplicationData?.data}
                    size="small"
                    onChange={(event: React.SyntheticEvent, value: any) => {
                      setValue("student_info", value?._id);
                      clearErrors(["student_info"]);
                    }}
                    loading={isLoading}
                    fullWidth
                    getOptionLabel={(option) =>
                      option?.first_name +
                        " " +
                        option?.middle_name +
                        " " +
                        option?.last_name || ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Please Select Student or Search"
                        helperText={errors.student_info?.message}
                        error={!!errors.student_info}
                      />
                    )}
                  />
                )}
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

export default StudentInfo;
