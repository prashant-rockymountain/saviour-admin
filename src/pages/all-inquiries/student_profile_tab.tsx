import { Grid, Typography } from "@mui/material";
import React from "react";



const StudentProfile = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{fontSize:"20px", fontWeight:"bold",color:"black"}}>Student Profile</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"20px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Full Name : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"20px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Education : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Student Code : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Stream : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Gender : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Passing Year : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Passport Number : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Result : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>Email : dhsjdh</Typography>
                </Grid>
                <Grid item xs={6} sx={{mt:"10px"}}>
                    <Typography sx={{fontSize:"18px", fontWeight:"bold",color:"black"}}>BackLogs : dhsjdh</Typography>
                </Grid>

            </Grid>
        </>
    )
}
export default StudentProfile