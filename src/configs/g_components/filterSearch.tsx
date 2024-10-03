import React from "react";
import { Autocomplete, Chip, Grid, TextField, Typography } from "@mui/material"
import { filterObj } from "src/pages/course-finder";
 const FilterSearch=({setFilterationObj}:{setFilterationObj:React.Dispatch<React.SetStateAction<filterObj>>})=>{
    return (
<Grid container spacing={2}>

<Grid item xs={12}><Typography variant="h6"><b>Search by keyword</b></Typography></Grid>
            <Grid item xs={12}>
        <Autocomplete
        multiple
        size="small"
        options={[]}
 freeSolo
        onChange={(_:any,v:any)=>setFilterationObj((pre)=>({...pre,searchData:v}))}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip
                variant="filled"
                sx={{borderRadius:"5px"}}
                label={option}
                {...getTagProps({ index })}
                />
            ))
        }
        renderInput={(params) => <TextField {...params} placeholder="e.g Montreal,Computer" />}
        />
        </Grid>
        </Grid>
    )
}
export default FilterSearch
