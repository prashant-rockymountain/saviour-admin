import { LocationOnOutlined, MapOutlined, TextSnippetOutlined, VideocamOutlined } from '@mui/icons-material'
import { Chip, Divider, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

interface high {
    graduation_type: string[]
    study_area: string[]
    study_area_category: string[]
}

interface sidebar {
    universityProfile: Record<string, any>
    handlechange: (data: high) => void
}

const InstitudeSiderbar: FC<sidebar> = ({ universityProfile, handlechange }) => {
    const editdata = universityProfile
    const url = window.location.pathname
    const router = useRouter()
    const map = `https://maps.google.com?q=${editdata?.university?.location?.latitude},${editdata?.university?.location?.longitude}`
    const keyDetailsData = [
        { "label": "Video Link", icondata: <VideocamOutlined sx={{ ml: 1 }} color='primary' />, linkdata: editdata?.university?.video_link },
        { "label": "Map Link", icondata: <LocationOnOutlined sx={{ ml: 1.7 }} color='primary' />, linkdata: map },
        { "label": "Brochure", icondata: <TextSnippetOutlined sx={{ ml: 1.7 }} color='primary' />, linkdata: editdata?.university?.brochure_link },
        { "label": "City Guide", icondata: <MapOutlined sx={{ ml: 1 }} color='primary' />, linkdata: editdata?.university?.city_link },
    ]

    const programCourse: Array<Record<string, any>> = editdata?.course_details

    const commonFunction = (programcourse: Array<Record<string, any>>, key: string) => {
        let retrunValue: any = [...new Set(programcourse.map((ele: Record<string, any>) => JSON.stringify(ele[key])))].map(JSON.parse as any);
        if (key === "study_area_category") {
            let newvalue = retrunValue?.flat(Infinity)
            retrunValue = [...new Set(newvalue.map((ele: Record<string, any>) => JSON.stringify(ele)))].map(JSON.parse as any).flat(Infinity)
        }
        return retrunValue
    }

    const [highlight, sethighlight] = useState<high>({
        graduation_type: [],
        study_area: [],
        study_area_category: []
    })

    const [credential, setcredential] = useState<Record<string, any>[]>(commonFunction(programCourse, "graduation_type"))
    const [studyarea, setstudyarea] = useState<Record<string, any>[]>(commonFunction(programCourse, "study_area"))
    const [areacategory, setareacateogory] = useState<Record<string, any>[]>(commonFunction(programCourse, "study_area_category"))

    const redirectUrls = (url: string) => {
        window.open(url, '_blank')
    }


    const checkarrlist = (myarray: high) => {
        let mynewarr = []
        if (myarray.graduation_type.length && myarray.study_area.length) {
            mynewarr = programCourse.filter((ele: Record<string, any>) => (myarray.graduation_type.includes(ele["graduation_type"]?._id) && myarray.study_area.includes(ele["study_area"]?._id)))
        } else if (myarray.graduation_type.length) {
            mynewarr = programCourse.filter((ele: Record<string, any>) => myarray.graduation_type.includes(ele["graduation_type"]?._id))
        } else if (myarray.study_area.length) {
            mynewarr = programCourse.filter((ele: Record<string, any>) => myarray.study_area.includes(ele["study_area"]?._id))
        } else {
            mynewarr = programCourse
        }
        return mynewarr
    }

    const showhightlight = (key: keyof high, id: string) => {
        let myarray: high = JSON.parse(JSON.stringify(highlight))
        if (myarray[key].includes(id)) {
            myarray[key].splice(myarray[key].indexOf(id), 1)
        } else {
            myarray[key].push(id)
        }

        if (key === "graduation_type") {
            myarray["study_area"] = []
            myarray["study_area_category"] = []
            setstudyarea(commonFunction(checkarrlist(myarray), "study_area"))
            setareacateogory(commonFunction(checkarrlist(myarray), "study_area_category"))
        } else if (key === "study_area") {
            myarray["study_area_category"] = []
            setareacateogory(commonFunction(checkarrlist(myarray), "study_area_category"))
        }
        handlechange(myarray)
        router.replace(`${url}?page=1`)
        sethighlight(myarray)
    }


    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography fontWeight={"bold"} fontSize={14.5}>KEY DETAILS</Typography>
            </Grid>
            
            {keyDetailsData.map((row: Record<string, any>, index: number) => (
                <Grid item xs={6} key={Math.random()}>
                    <Typography variant='body1' fontWeight={600} fontSize={13.5} sx={{ display: "flex", alignItems: "center" }}>{row.label} : &nbsp;<span onClick={() => redirectUrls(row?.linkdata)} style={{ cursor: "pointer" }}>{row.icondata}</span></Typography>
                </Grid>
            ))}
            
            <Grid item xs={12} mt={1} >
                <Typography sx={{ pr: 4 }} variant='body1' fontWeight={600} fontSize={13.5}>Campus : &nbsp;&nbsp;&nbsp;<span style={{ fontWeight: 300, textTransform: "uppercase" }}>{editdata?.university?.location?.city?.name}</span></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1' fontWeight={600} fontSize={13.5}>Website : &nbsp;<a style={{ fontWeight: 300, color: "#da2627" }} href={editdata?.university?.website_link} target='_blank'>{editdata?.university?.website_link}</a></Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={"bold"} fontSize={14.5}>CREDENTIALS</Typography>
            </Grid>
            <Grid item xs={12}>
                {credential.map((ele: Record<string, any>, index) => (<Chip size={"small"} onClick={() => showhightlight("graduation_type", ele?._id)} sx={{ m: 1, fontSize: 12.2, height: 36, textTransform: "capitalize" }} key={index} color={highlight.graduation_type.includes(ele?._id) ? 'primary' : "default"} label={ele?.program_type} />))}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={"bold"} fontSize={14.5}>AREA OF STUDY</Typography>
            </Grid>
            <Grid item xs={12}>
                {studyarea.map((ele: Record<string, any>, index) => (<Chip size={"small"} color={highlight.study_area.includes(ele?._id) ? 'primary' : "default"} onClick={() => showhightlight("study_area", ele?._id)} key={index} sx={{ m: 1, fontSize: 12.2, height: 36, textTransform: "capitalize" }} label={ele?.name} />))}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={"bold"} fontSize={14.5}>AREA OF STUDY SUB CATEGORY</Typography>
            </Grid>
            <Grid item xs={12}>
                {areacategory.map((ele: Record<string, any>, index) => (<Chip size={"small"} color={highlight.study_area_category.includes(ele?._id) ? 'primary' : "default"} onClick={() => showhightlight("study_area_category", ele?._id)} key={index} sx={{ m: 1, fontSize: 12.2, height: 36, textTransform: "capitalize" }} label={ele?.name} />))}
            </Grid>
        </Grid>
    )
}

export default InstitudeSiderbar