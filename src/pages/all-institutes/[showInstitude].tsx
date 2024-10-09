import { Button, Card, CardContent, CircularProgress, Collapse, Divider, Grid, Pagination, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import InstitudeSiderbar from './InstitudeSiderbar'
import { useSelector } from 'react-redux'
import { ApiUrl } from 'src/configs/api/apiUrls'
import { Interweave } from 'interweave'
import { useMutation, useQuery } from '@tanstack/react-query'
import UniversityController from './controller'
import { useRouter } from 'next/router'
import CustomChip from 'src/configs/g_components/CustomChip'
import { count } from 'console'

interface high {
  graduation_type: string[]
  study_area: string[]
  study_area_category: string[]
}

const universityController = new UniversityController()
const ShowInstitute = () => {

  const router = useRouter()
  const url = window.location.pathname
  const showInstitude = url.split("/")[2]
  const pageno = new URLSearchParams(window.location.search).get("page")
  const [read, setread] = useState(false)
  const [limit, setlimit] = useState(4)
  const [loader, setloader] = useState(false)

  const [showcourse, setshowcourse] = useState<Record<string, any>>()

  const { data: universityProfile } = useQuery({
    queryKey: ["UniversityProfile", showInstitude],
    enabled: !!showInstitude,
    queryFn: () => universityController.getUniversityProfile({ id: showInstitude as string })
  })

  let emptyobj = {
    graduation_type: [],
    study_area: [],
    study_area_category: [],
    university: showInstitude
  }


  const [bodydata, setbodydata] = useState<Record<string, any>>({})
  const { mutate, data: coursedata, isSuccess } = useMutation({
    mutationFn: (bodydata: Record<string, any>) => universityController.getUniversityCourse(bodydata, +(pageno ?? "1"), limit),
    onSuccess: () => {
      setloader(false)
    }
  })



  const handlechange = (data: high) => {
    let newdata = { ...data, "university": showInstitude }
    mutate({ ...newdata })
    setbodydata({ ...newdata })
    setloader(true)
  }

  useEffect(() => {
    if (isSuccess) {
      setshowcourse(coursedata)
    }
  }, [isSuccess])


  useEffect(() => {
    setloader(true)
    if (Object.keys(bodydata).length) {
      mutate({ ...bodydata })
    } else {
      mutate({ ...emptyobj })
    }
  }, [pageno, showInstitude])



  return (
    <Grid container spacing={6}>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {!universityProfile ? <Skeleton variant='rectangular' width={"100%"} height={"55vh"} /> :
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>
                        <Typography fontWeight={"bold"} pb={1} textTransform={"uppercase"} fontSize={20}>{universityProfile?.university?.name?.name}</Typography>
                        <Typography variant='body1' textTransform={"uppercase"} fontWeight={500} fontSize={17}>{universityProfile?.university?.location?.city?.name}, {universityProfile?.university?.location?.state?.name}, {universityProfile?.university?.location?.country?.name}</Typography>
                      </span>
                      <img style={{ borderRadius: 7 }} width={"25%"} src={ApiUrl.IMAGE_BASE_URL + universityProfile?.university?.university_logo} alt='College Image' />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Collapse orientation="vertical" style={{ transition: "1s all" }} in={read} collapsedSize={44}>
                        <Interweave content={universityProfile?.university?.about} />
                      </Collapse>

                    </Grid>
                    <Grid item xs={12} textAlign={"right"} >
                      <Typography color={"primary"} sx={{ cursor: "pointer" }} onClick={() => setread(!read)}>{read ? "Read Less" : "Read More"} </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>}
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>Courses : </Typography>
          </Grid>
          {loader ? <Grid item xs={12} textAlign={"center"}><CircularProgress size={25} /></Grid> : <>
            {showcourse?.details?.map((ele: Record<string, any>, index: number) => (
              <Grid item xs={12} key={ele?._id}>
                <Card sx={{ p: 4 }}>
                  <Grid container>
                    <Grid item xs={6} sm={6} md={6.7}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography sx={{ cursor: "pointer" }} fontSize={15} fontWeight={"bold"}>{ele?.course_id?.name?.slice(0, 50)}..</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography fontSize={13} color={"primary"} sx={{ cursor: "pointer" }} pt={3}>Requirements {">>"}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} md={5.3} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                      <Grid >
                        <Typography pb={1} sx={{ fontSize: { sm: 10, md: 14 } }}>Program Type</Typography>
                        <CustomChip fontsize={{ md: "11px", xs: "9px" }} label={ele?.graduation_type?.program_type} status={false} />
                      </Grid>
                      <Grid textAlign={"center"} >
                        <Typography sx={{ fontSize: { sm: 10, md: 14 } }} pb={1}>Duration</Typography>
                        <CustomChip label={ele?.duration > 1 ? ele?.duration + " " + "Years" : ele?.duration + " " + "Year"} fontsize={{ md: "0.7rem", xs: "9px" }} status={false} />
                      </Grid>
                      <Grid textAlign={"center"} >
                        <Typography sx={{ fontSize: { sm: 10, md: 14 } }} pb={1}>App. Fees</Typography>
                        <CustomChip label={ele?.university?.currency + " " + ele?.price} fontsize={{ md: "0.7rem", xs: "9px" }} status={false} />
                      </Grid>
                      <Grid textAlign={"center"}>
                        <Typography sx={{ fontSize: { sm: 10, md: 14 } }} pb={1}>Campus</Typography>
                        <CustomChip label={ele?.university?.location?.city?.name} fontsize={{ md: "0.7rem", xs: "9px" }} status={false} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography fontSize={15} color={"primary"} sx={{ cursor: "pointer", fontWeight: "bold", fontSize: 17 }} pt={3}>Apply Now {">>"}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </>}


          {(pageno && showcourse?.count) &&
            <Grid item mt={5} xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Pagination page={Number(pageno)} onChange={(e, value) => router.replace(`${url}?page=${value}`)} shape="rounded" color='primary' count={Math.ceil(showcourse?.count / limit)} size="large" />
              <Typography >of {showcourse?.count}</Typography>
            </Grid>
          }
        </Grid>
      </Grid>
      <Grid item lg={4} xs={12}>
        {!universityProfile ? <Skeleton variant='rectangular' width={"100%"} height={"85vh"} /> :
          <Card>
            <CardContent>
              <InstitudeSiderbar universityProfile={universityProfile} handlechange={handlechange} />
            </CardContent>
          </Card>
        }
      </Grid>
    </Grid>
  )
}

export default ShowInstitute