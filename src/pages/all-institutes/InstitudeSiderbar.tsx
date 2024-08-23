import { LocationOnOutlined, MapOutlined, TextSnippetOutlined, VideocamOutlined } from '@mui/icons-material'
import { Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material'
const InstitudeSiderbar = () => {
    const keyDetailsData = [
        { "label": "Video Link", icondata: <VideocamOutlined sx={{ ml: 1 }} color='primary' />, linkdata: "https://www.youtube.com/watch?v=cCtFyhQR2H4" },
        { "label": "Map Link", icondata: <LocationOnOutlined sx={{ ml: 1.7 }} color='primary' />, linkdata: "https://www.google.com/maps/place/St.+Clair+College+Windsor+Campus/@42.2465362,-83.0190515,17z/data=!3m1!4b1!4m6!3m5!1s0x883b2e90d65754af:0x6ecb67c712510aaa!8m2!3d42.2465362!4d-83.0190515!16zL20vMDNka2I1?entry=ttu" },
        { "label": "Brochure", icondata: <TextSnippetOutlined sx={{ ml: 1.7 }} color='primary' />, linkdata: "https://www.stclaircollege.ca/sites/default/files/paragraphs/files/2023-24-Handbook.pdf" },
        { "label": "City Guide", icondata: <MapOutlined sx={{ ml: 1 }} color='primary' />, linkdata: "https://www.youtube.com/watch?v=nLBd5PwGD0g" },
    ]

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>KEY DETAILS</Typography>
            </Grid>
            {keyDetailsData.map((row: Record<string, any>, index: number) => (
                <Grid item xs={6} key={Math.random()}>
                    <Typography variant='body1' fontWeight={600} fontSize={16} sx={{ display: "flex", alignItems: "center" }}>{row.label} : &nbsp;&nbsp;{row.icondata}</Typography>
                </Grid>
            ))}
            <Grid item xs={12} mt={2} sx={{overflowX:"hidden"}}>
                <Typography sx={{ pr: 4 }} variant='body1' fontWeight={600} fontSize={16}>Campus : &nbsp;<span style={{ fontWeight: 300 }}>https://www.stclaircollege.ca/https://www.sssssdh</span></Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='body1' fontWeight={600} fontSize={16}>Website : &nbsp;<a style={{ fontWeight: 300,color:"#da2627" }} href='https://www.stclaircollege.ca/' target='_blank'>https://www.stclaircollege.ca/</a></Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>CREDENTIALS</Typography>
            </Grid>
            <Grid item xs={12}>
                {Array.from(new Array(13)).map((ele) => (<Chip sx={{ m: 2 }} color='primary' label="Chip Filled (20) " />))}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>AREA OF STUDY</Typography>
            </Grid>
            <Grid item xs={12}>
                {Array.from(new Array(16)).map((ele) => (<Chip sx={{ m: 2 }} label="Chip Filled (18)" />))}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>AREA OF STUDY SUB CATEGORY</Typography>
            </Grid>
            <Grid item xs={12}>
                {Array.from(new Array(16)).map((ele) => (<Chip sx={{ m: 2 }} label="Chip Filled (18)" />))}
            </Grid>
        </Grid>
    )
}

export default InstitudeSiderbar