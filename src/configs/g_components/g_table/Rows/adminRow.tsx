import {
  TableRow,
  Skeleton,
  TableCell,
  Switch,
  Fab,
  CircularProgress,
  Chip,
  alpha,
  styled,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";

import EditIcon from "@mui/icons-material/Edit";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CustomChip from "../../CustomChip";
import { ApiUrl } from "src/configs/api/apiUrls";
import CustomThumb from "../../CustomThumb";

const AdminRow: FC<rowType> = ({
  isLoading,
  serialNumber,
  clickbutton,
  row,
  index,
  ...prop
}) => {
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
          <TableCell align="left">
            <CustomThumb alt={row?.name} src={`${row?.logo}`} />
          </TableCell>
          <TableCell align="left">{row?.name}</TableCell>
          <TableCell align="left">{row?.agency_name}</TableCell>
          <TableCell align="center">
            <CustomChip status={row?.is_active} />
          </TableCell>
          <TableCell align="right">
            {
              <Fab
                size="small"
                color="secondary"
                onClick={() => {
                  dispatch(addeditdata(row));
                  router.push("/admin/addEditAdmin");
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

export default AdminRow;
