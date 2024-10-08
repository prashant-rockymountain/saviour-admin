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
import CustomThumb from "../../CustomThumb";

const InstitudeRow: FC<rowType> = ({
    isLoading,
    serialNumber,
    clickbutton,
    row,
    index,
    ...prop
}) => {

    const router = useRouter();
    const showInstitude = (data: Record<string, any>) => {
        if (data?.course_details?.map((ele: any) => ele?.courses)?.flat(Infinity)?.length > 10) {
            router.push("/all-institutes/" + data?.university?._id + "?page=1")
        } else {
            router.push("/all-institutes/" + data?.university?._id)
        }

    }

    return (
        <TableRow hover key={Math.random()}>
            {isLoading ? (
                <TableCell colSpan={6}>
                    <Skeleton variant="text" height={40} />
                </TableCell>
            ) : (
                <>
                    <TableCell align="left">{serialNumber}</TableCell>
                    <TableCell align="center">
                        <CustomThumb
                            alt={row?.university?.name?.name}
                            src={row?.university?.university_logo}
                        />
                    </TableCell>
                    <TableCell align="center" >
                        {row?.university?.name?.name}
                    </TableCell>
                    <TableCell align="center">
                        {row?.university?.location?.address}
                    </TableCell>
                    <TableCell align="center">
                        {row?.course_details?.map((ele: any) => ele?.courses)?.flat(Infinity)?.length}
                    </TableCell>
                    <TableCell align="right">
                        <Fab
                            size="small"
                            color="secondary"
                            onClick={() => showInstitude(row)}

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
