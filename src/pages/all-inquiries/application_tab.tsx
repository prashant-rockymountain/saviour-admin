import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import GChip from "src/configs/g_components/g_chip";



const Application = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>Applications</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: "20px", backgroundColor: "#EBEBEB", borderRadius: "7px" }}>
                    <Grid container spacing={1} sx={{ p: "20px" }}>
                        <Grid item md={3} xs={12}>
                            <Avatar alt="photo" sx={{ width: {md:"80%",xs:"100%"}, height: "100px" }} variant="rounded" />


                        </Grid>
                        <Grid item md={5} xs={12}>
                            <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>Offer Courses</Typography>
                            <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "black", mb: "10px" }}>Offer Courses</Typography>
                            <GChip size='medium' bgcolor="#0000FF" color="#0000FF" label="PND-VISA" />
                        </Grid>
                        <Grid item md={4} xs={12} sx={{display:"flex",flexDirection:'column',justifyContent:"space-between" }}>
                            <Chip label="APPLICATION DECLINED BY STUDENT" sx={{borderRadius:"7px",mb:{md:"0px",xs:"10px"}}} color="primary" />
                            <Chip label="APPLICATION DECLINED BY STUDENT" sx={{borderRadius:"7px", color:"white",bgcolor:"black",mb:{md:"0px",xs:"10px"}}}  />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default Application