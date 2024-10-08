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

import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";
import CustomChip from "../../g_components/CustomChip";
const RoleOptionsRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  clickbutton,
  open,
  row,
  index,
  ...prop
}) => {

  const dispatch = useDispatch();
  const router = useRouter();



  return (
    <TableRow hover key={Math.random()}>
      {isLoading ? (
        <TableCell colSpan={5}>
          <Skeleton variant="text" height={40} />
        </TableCell>
      ) : (
        <>
          <TableCell>{serialNumber}</TableCell>
          <TableCell align="left">{row?.name}</TableCell>
          <TableCell align="center"> <CustomChip status={row?.is_active} /></TableCell>
          <TableCell align="center">
            {
              <Fab
                size="small"
                color="secondary"
                onClick={() => {
                  dispatch(addeditdata(row));
                  open(true)
                  // router.push("/country/addEditCountry");
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

export default RoleOptionsRow;
