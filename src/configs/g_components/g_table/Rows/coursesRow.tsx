import {
  TableRow,
  Skeleton,
  TableCell,
  Switch,
  Fab,
  CircularProgress,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";

import EditIcon from "@mui/icons-material/Edit";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import CustomChip from "../../CustomChip";

const CoursesRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  row,
  index,
  ...prop
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const hanclick = (data: Record<string, any>) => {
    router.push("/courses/addEdit");
    dispatch(addeditdata(data));
  };

  return (
    <TableRow hover key={Math.random()}>
      {isLoading ? (
        <TableCell colSpan={5}>
          <Skeleton variant="text" height={40} />
        </TableCell>
      ) : (
        <>
          <TableCell align="left">{serialNumber}</TableCell>
          <TableCell align="left" sx={{ textTransform: "uppercase" }}>
            {row?.name}
          </TableCell>
          <TableCell align="left">{row?.duration}</TableCell>
          <TableCell align="left" >
            {row?.intake}
          </TableCell>
          <TableCell align="center">
            <CustomChip status={row?.is_active} />
          </TableCell>
          <TableCell align="right">
            {
              <Fab size="small" color="secondary" onClick={() => hanclick(row)}>
                <EditIcon />
              </Fab>
            }
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default CoursesRow;
