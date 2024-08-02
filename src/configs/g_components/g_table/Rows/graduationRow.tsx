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

const GraduationRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  row,
  index,
  ...prop
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const hanclick = (data: Record<string, any>) => {
    router.push("/graduation/addEdit");
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
          <TableCell align="left" >
            {row?.program_type}
          </TableCell>
          <TableCell align="left">{row?.study_area?.length}</TableCell>
          <TableCell align="left">
            <CustomChip status={row?.is_active} />
          </TableCell>
          <TableCell align="center">
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

export default GraduationRow;
