// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { alpha, Chip, Divider, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IconifyIcon from "src/configs/theme/components/icon";
import CustomChip from "src/configs/g_components/CustomChip";
import { Doughnut } from 'react-chartjs-2';
import { AbilityNames } from "src/configs/g_constants/allConstants";
const Home = () => {
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [50, 100, 200, 300],

      backgroundColor: [
        '#d92324',
        '30d1128',
        '#0072ee',
        '#f4f4f4'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderBottom: "4px solid #f25e5f " }}>
          <CardContent>
            <Grid container spacing={2}>

              <Grid item xs={2} sm={1.5} >

                <Fab variant="circular" sx={{ borderRadius: "8px" }} color="primary" size="small">
                  <IconifyIcon icon='hugeicons:task-done-02' fontSize={"1.5rem"} />
                </Fab>
              </Grid>
              <Grid item xs={10} sm={10.5} >
                <Typography fontSize={"28px"} px={2}><b>24.6K</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={"22px"}><b>Total Staff Members</b></Typography>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderBottom: "4px solid #f25e5f " }}>
          <CardContent>
            <Grid container spacing={2}>

              <Grid item xs={2} sm={1.5} >

                <Fab variant="circular" sx={{ borderRadius: "8px" }} color="primary" size="small">
                  <IconifyIcon icon='hugeicons:task-done-02' fontSize={"1.5rem"} />
                </Fab>
              </Grid>
              <Grid item xs={10} sm={10.5} >
                <Typography fontSize={"28px"} px={2}><b>24.6K</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={"22px"}><b>Total Staff Members</b></Typography>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderBottom: "4px solid #f25e5f " }}>
          <CardContent>
            <Grid container spacing={2}>

              <Grid item xs={2} sm={1.5} >

                <Fab variant="circular" sx={{ borderRadius: "8px" }} color="primary" size="small">
                  <IconifyIcon icon='hugeicons:task-done-02' fontSize={"1.5rem"} />
                </Fab>
              </Grid>
              <Grid item xs={10} sm={10.5} >
                <Typography fontSize={"28px"} px={2}><b>24.6K</b></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={"22px"}><b>Total Staff Members</b></Typography>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>

        <Card>
          <CardContent>
            <Typography variant="h5">Cases Details</Typography>
            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr No.</TableCell>
                    <TableCell >Case/App Id</TableCell>
                    <TableCell >Student Name</TableCell>
                    <TableCell >Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      case-21
                    </TableCell>
                    <TableCell>
                      Vinay
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={"Pending"}
                        sx={{
                          bgcolor: alpha("#D74242", 0.16),
                          color: "#b80202",
                          fontWeight: 800,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>



                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>

        <Card sx={{ height: { md: "70vh" } }} >
          <Typography textAlign={"center"} pt={3} variant="h5">Cases Info</Typography>
          <CardContent sx={{ height: "80%", display: "flex", alignItems: "center", justifyContent: "center" }} >


            <Doughnut data={data} />


          </CardContent>
        </Card>
      </Grid>


    </Grid>
  );
};

// Home.acl = {
//   subject: AbilityNames.DASHBOARD_PAGE,
// };

export default Home;
