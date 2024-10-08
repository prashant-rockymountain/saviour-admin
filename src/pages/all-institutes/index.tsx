import { Card, CardContent, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import GTable from "src/configs/g_components/g_table/Table/g_table";
import Searchbar from "src/configs/g_components/Searchbar";
import UniversityController from "./controller";
import InstitudeRow from "src/configs/g_components/g_table/Rows/institudeRow";

const universityController = new UniversityController()

const AllInstitutes = () => {

    const TABLE_HEAD = [
        { label: "sr no", align: "left" },
        { label: "Logo", align: "center" },
        { label: "University Name", align: "center" },
        { label: "Location", align: "center" },
        { label: "No of Courses", align: "center" },
        { label: "Action", align: "right" },
    ];


    const { data, isLoading,isSuccess } = useQuery({
        queryKey: ["AllTrueUniversity"],
        queryFn: () => universityController.getUniversityList({ is_active: true }),
    })


    const [filteredData, setFilteredData] = useState<Record<string, any>[]>([])


    useEffect(()=>{
        setFilteredData(data)
    },[isSuccess])


    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Searchbar data={data} setFilteredData={setFilteredData} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <GTable
                    headData={TABLE_HEAD}
                    data={filteredData}
                    isLoading={isLoading}
                    row={InstitudeRow}
                />
            </Grid>

        </Grid>
    )
}
export default AllInstitutes;