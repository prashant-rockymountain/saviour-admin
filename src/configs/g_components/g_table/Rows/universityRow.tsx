import {
  TableRow,
  Skeleton,
  TableCell,
  Switch,
  Fab,
  CircularProgress,
  Chip,
  alpha,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";

import EditIcon from "@mui/icons-material/Edit";
import { addeditdata, storeUniversityData } from "src/reduxStore/editDataSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CustomChip from "../../CustomChip";
import CustomThumb from "../../CustomThumb";

const UniversityRow: FC<rowType> = ({
  isLoading,
  serialNumber,
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
            <CustomThumb
              alt={"university logo"}
              src={row?.university?.university_logo}
            />
          </TableCell>
          <TableCell align="left">{row?.university?.name?.name}</TableCell>
          <TableCell align="center">
            {row?.university?.location?.address}
          </TableCell>
          <TableCell align="center">
            <CustomChip status={row?.university?.is_active} />
          </TableCell>
          <TableCell align="right">
            {
              <Fab
                size="small"
                color="secondary"
                onClick={() => {
                  dispatch(addeditdata(row));
                  dispatch(storeUniversityData(null));
                  router.push("/university/addEditUniversity");
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

export default UniversityRow;
