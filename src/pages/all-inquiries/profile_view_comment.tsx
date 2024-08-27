import { Avatar, Button, Card, CardContent, Chip, Grid, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import GChip from "src/configs/g_components/g_chip";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import RoomIcon from '@mui/icons-material/Room';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from "next/link";
import { useRouter } from "next/router";
const ProfileViewComment = () => {
    const router = useRouter();

    return (
        <>
            <Grid container spacing={6}>
                <Grid item lg={4} md={5} sm={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Avatar variant="circular" src="https://img.freepik.com/premium-photo/beautiful-girl-avatar_984951-127.jpg" sx={{ width: "100px", height: "100px" }} />
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Typography sx={{ fontWeight: "bold", color: "black", fontSize: "18px" }}>Lara Craft</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Typography sx={{ color: "black", fontSize: "15px" }}>(GOHP_1993)</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                    <GChip size='medium' bgcolor="#808080" color="#808080" label="PND-VISA" />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: "15px" }}>
                                <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                    <MenuBookIcon sx={{ fontSize: "27px", color: "gray" }} /> <Typography sx={{ color: "gray", fontSize: "14px", ml: "5px" }}>FANSHAWE COLLEGE</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                    <SchoolIcon sx={{ fontSize: "27px", color: "gray" }} /> <Typography sx={{ color: "gray", fontSize: "14px", ml: "5px" }}>Early Child Hood Education</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                    <RoomIcon sx={{ fontSize: "27px", color: "gray" }} /> <Typography sx={{ color: "gray", fontSize: "14px", ml: "5px" }}>London</Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                    <PublicIcon sx={{ fontSize: "27px", color: "gray" }} /> <Typography sx={{ color: "gray", fontSize: "14px", ml: "5px" }}>Canada</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ mt: "5px" }}>

                                    <span style={{ marginLeft: "10px" }}><GChip size='small' bgcolor="#008000" color="#008000" label="SEP-2024" /></span>
                                    <span style={{ marginLeft: "10px" }}><GChip size='small' bgcolor="#A020F0" color="#A020F0" label="DIPLOMA" /> </span>
                                    <span style={{ marginLeft: "10px" }}><GChip size='small' bgcolor="#FF0000" color="#FF0000" label="DEFER APP" /> </span>

                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", mt: "15px" }}>
                                    <Button variant="contained" startIcon={<KeyboardBackspaceIcon />} onClick={()=>{router.push("/all-inquiries/profile_back")}}>
                                        Profile
                                    </Button>
                                    <Button variant="contained" startIcon={<KeyboardBackspaceIcon />} onClick={()=>{router.push("/all-inquiries")}}>
                                        Back
                                    </Button>
                                </Grid>

                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>
                <Grid item lg={8} md={7} xs={12}>
                    <Card>
                        <CardContent>
                            <Grid item xs={12} sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                                <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>Comment</Typography>
                                {/* <Link href={"/role/addEditRole"}> */}
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        // dispatch(addeditdata(null));
                                    }}
                                >
                                    Add Comment
                                </Button>
                                {/* </Link> */}
                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </>
    );
};

export default ProfileViewComment;
