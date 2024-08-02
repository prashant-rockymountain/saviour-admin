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
import CustomChip from "../../CustomChip";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";

const CampusRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  clickbutton,
  row,
  index,
  open,
  ...prop
}) => {
  const dispatch = useDispatch();
  return (
    <TableRow hover key={Math.random()}>
      {isLoading ? (
        <TableCell colSpan={5}>
          <Skeleton variant="text" height={40} />
        </TableCell>
      ) : (
        <>
          <TableCell align="left">{serialNumber}</TableCell>
          <TableCell align="left">{row?.name}</TableCell>
          <TableCell align="center">
            <CustomChip status={row?.is_active} />
          </TableCell>
          <TableCell align="right">
            {
              <Fab
                size="small"
                color="secondary"
                onClick={() => {
                  open(true);
                  dispatch(addeditdata(row));
                }}
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

export default CampusRow;
