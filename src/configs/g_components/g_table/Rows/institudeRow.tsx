import {
    TableRow,
    Skeleton,
    TableCell,
    Fab,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Edit, Visibility } from "@mui/icons-material";
import { addeditdata } from "src/reduxStore/editDataSlice";

const InstitudeRow: FC<rowType> = ({
    isLoading,
    serialNumber,
    clickbutton,
    row,
    index,
    ...prop
}) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const showInstitude = (data:Record<string,any>) => {
        dispatch(addeditdata(data))
        router.push("/all-institutes/showInstitude")
    }

    return (
        <TableRow hover key={Math.random()}>
            {isLoading ? (
                <TableCell colSpan={5}>
                    <Skeleton variant="text" height={40} />
                </TableCell>
            ) : (
                <>
                    <TableCell>{serialNumber}</TableCell>
                    <TableCell align="left" >
                        {row?.university?.name?.name}
                    </TableCell>
                    <TableCell align="center">
                        {row?.university?.location?.city?.name}
                    </TableCell>
                    <TableCell align="center">
                        {row?.university?.location?.state?.name}

                    </TableCell>
                    <TableCell align="right">
                        <Fab
                            size="small"
                            color="secondary"
                            onClick={()=>showInstitude(row)}

                        >
                            <Visibility />
                        </Fab>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
};

export default InstitudeRow;
