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

const InquiriesRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  clickbutton,
  row,
  index,
  ...prop
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hanclick = (data: string) => {
    if (clickbutton) {
      clickbutton(data);
    }
  };

  return (
    <TableRow hover key={Math.random()}>
      {isLoading ? (
        <TableCell colSpan={7}>
          <Skeleton variant="text" height={40} />
        </TableCell>
      ) : (
        <>
          <TableCell>{serialNumber}</TableCell>
          <TableCell align="left">
            {row?.first_name + " " + row?.middle_name + " " + row?.last_name}
          </TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="center">{row?.applications?.length} </TableCell>
          <TableCell align="center"> </TableCell>
          <TableCell align="center"> </TableCell>
          <TableCell align="center">
            {
              <Fab
                size="small"
                color="secondary"
                onClick={
                  clickbutton != undefined
                    ? () => hanclick
                    : () => {
                        // dispatch(addeditdata(row));
                        router.push("/all-inquiries/" + row?._id);
                      }
                }
              >
                <VisibilityIcon />
              </Fab>
            }
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default InquiriesRow;
