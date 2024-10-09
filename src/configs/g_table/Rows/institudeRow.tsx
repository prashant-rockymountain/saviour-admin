import {
    TableRow,
    Skeleton,
    TableCell,
    Fab,
} from "@mui/material";
import { FC } from "react";
import { rowType } from "src/configs/g_types/types";
import { useRouter } from "next/router";
import { Edit, Visibility } from "@mui/icons-material";
import CustomThumb from "../../g_components/CustomThumb";

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
        router.push("/all-institutes/" + data?.university?._id + "?page=1")
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
