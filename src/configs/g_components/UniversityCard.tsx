import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import CustomChip from "./CustomChip";
import { textcolor } from "src/configs/theme/palette";
import PlaceIcon from "@mui/icons-material/Place";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
export const UniversityCard = () => {
  return (
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box
                component={"img"}
                width={{ xs: "20vw", lg: "14vw" }}
                sx={{ borderRadius: "6px" }}
                src="https://gocoolgroup.com/crmportal/uploads/uni_logo/1670823242air_College.jpg"
              />
              <Grid
                item
                xs={11}
                display={"flex"}
                gap={2}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <VideocamOutlinedIcon color={"info"} />
                <PlaceIcon color={"info"} />
                <InfoOutlinedIcon color={"info"} />
                <ArticleOutlinedIcon color={"info"} />
                <MapOutlinedIcon color={"info"} />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h6" fontSize={"1.1rem"}>
                    <b> ADVERTISING & MARKETING COMMUNICATIONS MANAGEMENT</b>
                  </Typography>
                  <Typography gutterBottom>
                    ST. CLAIR COLLEGE @ WINDSOR , ONTARIO , Canada
                  </Typography>
                </Grid>
                <Grid item xs={4} direction={"column"}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      float: "right",
                    }}
                  >
                    <Grid item>
                      <CustomChip status={true} label={"January (Open)"} />
                    </Grid>
                  </Box>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item display={"flex"} direction={"column"} gap={2}>
                    <Typography fontSize={"1.1rem"}>
                      <b>Program Type</b>
                    </Typography>
                    <CustomChip status={true} label="ADVANCED DIPLOMA" />
                  </Grid>
                  <Grid item display={"flex"} direction={"column"} gap={2}>
                    <Typography fontSize={"1.1rem"}>
                      <b>Duration</b>
                    </Typography>
                    <CustomChip status={true} label="3 years" />
                  </Grid>
                  <Grid item display={"flex"} direction={"column"} gap={2}>
                    <Typography fontSize={"1.1rem"}>
                      <b>App. Fees</b>
                    </Typography>
                    <CustomChip status={true} label="ADVANCED DIPLOMA" />
                  </Grid>
                  <Grid item display={"flex"} direction={"column"} gap={2}>
                    <Typography fontSize={"1.1rem"}>
                      <b>Campus</b>
                    </Typography>
                    <CustomChip status={true} label="ADVANCED DIPLOMA" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography color={textcolor.primary_text}>
                    Tentative Commision  &nbsp;: &nbsp;<CustomChip label="CAD 459" status={true} />
                    </Typography>
                    <Grid item>
                      <Button variant="contained">Apply Now</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
};
