import * as yup from "yup";
import {
  TableRow,
  Skeleton,
  TableCell,
  Switch,
  Fab,
  CircularProgress,
  Chip,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { FC, useState } from "react";
import { rowType } from "src/configs/g_types/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";
import CustomChip from "../../CustomChip";
import { ApiUrl } from "src/configs/api/apiUrls";
import GUpload from "../../g_upload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

const AcademicDocumentsRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  clickbutton,
  row,
  index,
  ...prop
}) => {
  const hanclick = (data: string) => {
    if (clickbutton) {
      clickbutton(data);
    }
  };

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const documentsNameObj = {
    tenth: "10th Grade",
    tweleveth: "12th Grade",
    bachelor_n_marksheet: "Bachelor Degree & Marksheet",
    master_n_marksheet: "Master Degree & Marksheet",
    diploma_marksheet: "Diploma Marksheet",
    english_proficiency: "English Proficiency Score",
    passport: "Passport Copy(1st & Last Page)",
    combined: "Combined - All Documents",
    backlog_certificate: "Backlog Certificate",
    admit_card: "Admit Card (12th Grade)",
    visa: "Visa Form",
    family_info: "Family Information",
    client_info:
      "Client Information ( IT Papers, Experience letter, Bank Certificate and Statement, Financial Documents with CA Report, SOP (if needed) )",
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const fileName = row[0];
  const profileData: any = {
    documents: {},
  };

  const schema = yup.object().shape({
    documents: yup
      .object()
      .shape({ fileName: yup.string().required("Please Upload Document") }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...profileData },
  });

  const values = watch();

  const onSubmit = (data: any) => {
    console.log(data, "adpoiejd");
  };
  console.log(row, values, "ad");

  return (
    <>
      <TableRow hover key={Math.random()}>
        {isLoading ? (
          <TableCell colSpan={6}>
            <Skeleton variant="text" height={40} />
          </TableCell>
        ) : (
          <>
            <TableCell align="left" color="#000">
              {/* @ts-ignore */}
              {documentsNameObj[`${row[0]}`]}
            </TableCell>
            <TableCell align="center">
              {" "}
              <CustomChip
                status={row[1]?.length > 0 ? true : false}
                label={row[1]?.length > 0 ? "Uploaded" : "Not-uploaded"}
              />
            </TableCell>
            <TableCell align="center">
              {
                row[1]?.length > 0 && (
                  <a href={`${ApiUrl.IMAGE_BASE_URL + row[1]}`} target="_blank">
                    <Fab size="small" color="secondary">
                      <VisibilityIcon />
                    </Fab>
                  </a>
                )
                // : (
                //   <Fab
                //     size="small"
                //     color="secondary"
                //     onClick={() => router.push("/")}
                //   >
                //     <EditIcon />
                //   </Fab>
                // )
              }
            </TableCell>
          </>
        )}
      </TableRow>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style}>
            <GUpload
              setValue={setValue}
              value={values?.documents.fileName}
              name={`documents.${fileName}`}
              labelName=""
              initialize={false}
              error={""}
            />
            <LoadingButton variant="contained" type="submit">
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default AcademicDocumentsRow;
