import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import {
  Card,
  CardContent,
  CardHeader,
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
import Crumbs from "src/configs/g_components/Crumbs";
import IconifyIcon from "src/configs/theme/components/icon";
import Customfield from "src/configs/g_components/Customfield";
import CourseDetails from "src/configs/g_components/g_forms/stepperForm/courseDetails";
import StudentInfo from "src/configs/g_components/g_forms/stepperForm/studentInfo";
import TestForm from "src/configs/g_components/g_forms/stepperForm/TestForm";
import EducationInfo from "src/configs/g_components/g_forms/stepperForm/educationInfo";
import EmploymentInfo from "src/configs/g_components/g_forms/stepperForm/employmentInfo";
import DocumentsForm from "src/configs/g_components/g_forms/stepperForm/documentsForm";
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));
const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 72.47deg, rgba(218, 38, 39) 22.16%, rgb(218, 38, 39,0.7) 76%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 72.47deg, rgba(218, 38, 39) 22.16%, rgb(218, 38, 39,0.7) 76%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <IconifyIcon icon={"hugeicons:course"} />,
    2: <IconifyIcon icon={"ph:student"} />,
    3: <IconifyIcon icon={"carbon:task-approved"} />,
    4: <IconifyIcon icon={"mdi:education-outline"} />,
    5: <IconifyIcon icon={"clarity:employee-line"} />,
    6: <IconifyIcon icon={"ion:document-attach-outline"} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// const steps = [
//   "Course Details",
//   "Student Info",
// "English Proficiency Test",
// "Education Info",
// "Employment Info",
// "Documents",
// ];

const StepperForm = () => {
  // const [activeStep, setActiveStep] = useState(0);
  const isLoading = false;

  // const getStepContent = (step: number) => {
  //   switch (step) {
  //     case 0:
  //       return (
  //         <>
  //           <CourseDetails setActiveStep={setActiveStep} />
  //         </>
  //       );
  //     case 1:
  //       return (
  //         <>
  //           <StudentInfo setActiveStep={setActiveStep} />
  //         </>
  //       );
  // case 2:
  //   return (
  //     <>
  //       <TestForm setActiveStep={setActiveStep} />
  //     </>
  //   );
  // case 3:
  //   return (
  //     <>
  //       <EducationInfo setActiveStep={setActiveStep} />
  //     </>
  //   );
  // case 4:
  //   return (
  //     <>
  //       <EmploymentInfo setActiveStep={setActiveStep} />
  //     </>
  //   );
  // case 5:
  //   return (
  //     <>
  //       <DocumentsForm setActiveStep={setActiveStep} />
  //     </>
  //   );
  // }
  // };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Crumbs
            links={[
              { title: "Dashboard", path: "/" },
              { title: "Add Application" },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <CourseDetails />
        </Grid>
      </Grid>
    </>
  );
};

export default StepperForm;
