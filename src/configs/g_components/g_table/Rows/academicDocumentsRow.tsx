import {
  TableRow,
  Skeleton,
  TableCell,
  Switch,
  Fab,
  CircularProgress,
  Chip,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";
import CustomChip from "../../CustomChip";
import { ApiUrl } from "src/configs/api/apiUrls";

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
  return (
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
            {row[1]?.length > 0 && (
              <a href={`${ApiUrl.IMAGE_BASE_URL + row[1]}`} target="_blank">
                <Fab size="small" color="secondary">
                  <VisibilityIcon />
                </Fab>
              </a>
            )}
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default AcademicDocumentsRow;
