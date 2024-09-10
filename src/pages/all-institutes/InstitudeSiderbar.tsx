import { LocationOnOutlined, MapOutlined, TextSnippetOutlined, VideocamOutlined } from '@mui/icons-material'
import { Chip, Divider, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
const InstitudeSiderbar = () => {
    const editdata = useSelector((state: Record<string, any>) => state?.data?.alleditdata?.editdata)
    const map = `https://maps.google.com?q=${editdata?.university?.location?.latitude},${editdata?.university?.location?.longitude}`
    const keyDetailsData = [
        { "label": "Video Link", icondata: <VideocamOutlined sx={{ ml: 1 }} color='primary' />, linkdata: editdata?.university?.video_link },
        { "label": "Map Link", icondata: <LocationOnOutlined sx={{ ml: 1.7 }} color='primary' />, linkdata: map },
        { "label": "Brochure", icondata: <TextSnippetOutlined sx={{ ml: 1.7 }} color='primary' />, linkdata: editdata?.university?.brochure_link },
        { "label": "City Guide", icondata: <MapOutlined sx={{ ml: 1 }} color='primary' />, linkdata: editdata?.university?.city_link },
    ]

    const commonFunction = (key: string) => {
        if (key === "graduation_type") {
            // let defaultArray = JSON.parse(JSON.stringify())
        } else {
            let retrunValue = editdata?.course_details?.map((ele: Record<string, any>) => ele[key]);
            return retrunValue
        }
    }

    const [highlight, sethighlight] = useState("")
    const [credential, setcredential] = useState<Record<string, any>[]>(commonFunction("graduation_type"))
    const [studyarea, setstudyarea] = useState<Record<string, any>[]>(commonFunction("study_area"))
    const [areacategory, setareacateogory] = useState<Record<string, any>[]>(commonFunction("study_area_category").flat(Infinity))

    console.log(credential)
    console.log(studyarea)
    console.log(areacategory)



    const redirectUrls = (url: string) => {
        window.open(url, '_blank')
    }


    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>KEY DETAILS</Typography>
            </Grid>
            {keyDetailsData.map((row: Record<string, any>, index: number) => (
                <Grid item xs={6} key={Math.random()}>
                    <Typography variant='body1' fontWeight={600} fontSize={16} sx={{ display: "flex", alignItems: "center" }}>{row.label} : &nbsp;<span onClick={() => redirectUrls(row?.linkdata)} style={{ cursor: "pointer" }}>{row.icondata}</span></Typography>
                </Grid>
            ))}
            <Grid item xs={12} mt={2} sx={{ overflowX: "hidden" }}>
                <Typography sx={{ pr: 4 }} variant='body1' fontWeight={600} fontSize={16}>Campus : &nbsp;&nbsp;&nbsp;<span style={{ fontWeight: 300, textTransform: "uppercase" }}>{editdata?.university?.location?.city?.name}</span></Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='body1' fontWeight={600} fontSize={16}>Website : &nbsp;<a style={{ fontWeight: 300, color: "#da2627" }} href={editdata?.university?.website_link} target='_blank'>{editdata?.university?.website_link}</a></Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>CREDENTIALS</Typography>
            </Grid>
            <Grid item xs={12}>
                {credential.map((ele) => (<Chip sx={{ m: 2, fontSize: 15, height: 36, textTransform: "capitalize" }} key={Math.random()} color='primary' label={ele?.program_type} />))}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>AREA OF STUDY</Typography>
            </Grid>
            <Grid item xs={12}>
                {studyarea.map((ele) => (<Chip key={Math.random()} sx={{ m: 2, fontSize: 15, height: 36, textTransform: "capitalize" }} label={ele?.name} />))}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' fontWeight={"bold"} fontSize={20}>AREA OF STUDY SUB CATEGORY</Typography>
            </Grid>
            <Grid item xs={12}>
                {areacategory.map((ele) => (<Chip key={Math.random()} sx={{ m: 2, fontSize: 15, height: 36, textTransform: "capitalize" }} label={ele?.name} />))}
            </Grid>
        </Grid>
    )
}

export default InstitudeSiderbar