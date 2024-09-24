import { Button, Card, CardContent, Collapse, Divider, Grid, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InstitudeSiderbar from './InstitudeSiderbar'
import { useSelector } from 'react-redux'
import { ApiUrl } from 'src/configs/api/apiUrls'
import { Interweave } from 'interweave'
import { useMutation, useQuery } from '@tanstack/react-query'
import UniversityController from './controller'
import { useRouter } from 'next/router'
interface high {
  graduation_type: string[]
  study_area: string[]
  study_area_category: string[]
}

const universityController = new UniversityController()
const ShowInstitute = () => {
  const router = useRouter()
  const showInstitude = window.location.pathname.split("/")[2]
  const [read, setread] = useState(false)
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

  const { mutate, data: coursedata } = useMutation({
    mutationFn: (bodydata: Record<string, any>) => universityController.getUniversityCourse(bodydata)
  })


  const handlechange = (data: high) => {
    console.log({
      ...data,
      "university": showInstitude
    }
    )
  }

  console.log(coursedata, !!coursedata)

  useEffect(() => {
    mutate({ ...emptyobj })
  }, [])



  return (
    <Grid container spacing={6}>
      <Grid item lg={8} xs={12}>

        <Grid container spacing={5}>
          <Grid item xs={12}>
            {!universityProfile ? <Skeleton variant='rectangular' width={"100%"} height={"55vh"} /> : <Card>
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
                    <Button variant='outlined' onClick={() => setread(!read)}>{read ? "Read Less" : "Read More"} </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>}
          </Grid>
        </Grid>
        
      </Grid>
      <Grid item lg={4} xs={12}>

        {!universityProfile ? <Skeleton variant='rectangular' width={"100%"} height={"85vh"} /> :
          <Card>
            <CardContent>
              <InstitudeSiderbar universityProfile={universityProfile} handlechange={handlechange} />
            </CardContent>
          </Card>}


      </Grid>
    </Grid>
  )
}

export default ShowInstitute