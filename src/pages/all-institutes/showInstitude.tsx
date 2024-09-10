import { Button, Card, CardContent, Collapse, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import InstitudeSiderbar from './InstitudeSiderbar'
import { useSelector } from 'react-redux'
import { ApiUrl } from 'src/configs/api/apiUrls'
import { Interweave } from 'interweave'

const showInstitude = () => {
  const [read, setread] = useState(false)
  const editdata = useSelector((state: Record<string, any>) => state?.data?.alleditdata?.editdata)

  return (
    <Grid container spacing={6}>
      <Grid item lg={8} xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>
                      <Typography fontWeight={"bold"} pb={1} textTransform={"uppercase"} fontSize={20}>{editdata?.university?.name?.name}</Typography>
                      <Typography variant='body1' textTransform={"uppercase"} fontWeight={500} fontSize={17}>{editdata?.university?.location?.city?.name}, {editdata?.university?.location?.state?.name}, {editdata?.university?.location?.country?.name}</Typography>
                    </span>
                    <img style={{ borderRadius: 7 }} width={"25%"} src={ApiUrl.IMAGE_BASE_URL + editdata?.university?.university_logo} alt='College Image' />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Collapse orientation="vertical" style={{ transition: "1s all" }} in={read} collapsedSize={44}>
                      {/* <Typography paragraph textAlign={"justify"}> */}
                      <Interweave content={editdata?.university?.about} />
                      {/* </Typography> */}
                    </Collapse>

                  </Grid>
                  <Grid item xs={12} textAlign={"right"} >
                    <Button variant='outlined' onClick={() => setread(!read)}>{read ? "Read Less" : "Read More"} </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} xs={12}>
        <Card>
          <CardContent>
            <InstitudeSiderbar />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default showInstitude