import {
  TableRow,
  Skeleton,
  TableCell,
  Switch,
  Fab,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";

import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";
import CustomChip from "../../CustomChip";
import { ApiUrl } from "src/configs/api/apiUrls";
import CustomThumb from "../../CustomThumb";

const StaffMemberRow: FC<rowType> = ({
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

  return (
    <TableRow hover key={Math.random()}>
      {isLoading ? (
        <TableCell colSpan={7}>
          <Skeleton variant="text" height={40} />
        </TableCell>
      ) : (
        <>
          <TableCell align="left">{serialNumber}</TableCell>
          <TableCell>
            {" "}
            <CustomThumb alt={"profile pic"} src={row?.profile_pic} />
          </TableCell>
          <TableCell align="left">{row?.name}</TableCell>
          <TableCell align="left">{row?.phone}</TableCell>
          <TableCell align="left" sx={{ textTransform: "none" }}>
            {row?.email}
          </TableCell>
          <TableCell align="left">
            {" "}
            <CustomChip status={row?.is_active} />
          </TableCell>
          <TableCell align="left">
            {
              <Fab
                size="small"
                color="secondary"
                onClick={
                  clickbutton != undefined
                    ? () => hanclick
                    : () => {
                        dispatch(addeditdata(row));
                        router.push("/staff-member/addEditStaffMember");
                      }
                }
              >
                <EditIcon />
              </Fab>
            }
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default StaffMemberRow;
