import { LocationOnOutlined, MapOutlined, TextSnippetOutlined, VideocamOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, Chip, Collapse, Divider, Grid, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import InstitudeSiderbar from './InstitudeSiderbar'
import Image from 'next/image'

const showInstitude = () => {
  const [read, setread] = useState(false)


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
                      <Typography fontWeight={"bold"} pb={1} fontSize={20}>ST. CLAIR COLLEGE</Typography>
                      <Typography variant='body1' fontWeight={500} fontSize={17}>WINDSOR, ONTARIO, CANADA</Typography>
                    </span>
                    <img style={{ borderRadius: 7 }} width={"25%"} src={"https://gocoolgroup.com/crmportal/uploads/uni_logo/1670823242air_College.jpg"} alt='College Image' />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Collapse orientation="vertical" style={{ transition: "1s all" }} in={read} collapsedSize={44}>
                      <Typography paragraph textAlign={"justify"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, reiciendis dicta maxime aut,
                        enim molestias voluptate porro provident perspiciatis vel id necessitatibus error quod iste dolore
                        magnam ullam atque in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, reiciendis dicta maxime aut,
                        enim molestias voluptate porro provident perspiciatis vel id necessitatibus error quod iste dolore
                        magnam ullam atque in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, reiciendis dicta maxime aut,
                        enim molestias voluptate porro provident perspiciatis vel id necessitatibus error quod iste dolore
                        magnam ullam atque in.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, reiciendis dicta maxime aut,
                        enim molestias voluptate porro provident perspiciatis vel id necessitatibus error quod iste dolore
                        magnam ullam atque in.
                      </Typography>
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