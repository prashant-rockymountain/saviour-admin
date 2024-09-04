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
import { FC } from "react";
import { ApiUrl } from "../api/apiUrls";

export const UniversityCard = ({
  image,
  program,
  university_name,
  name,
}: {
  image: string;
  program: string;
  university_name: string;
  name: string;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box
              component={"img"}
              width={{ xs: "20vw", lg: "14vw" }}
              sx={{ borderRadius: "6px" }}
              src={ApiUrl.IMAGE_BASE_URL + image}
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
                  <b> {name}</b>
                </Typography>
                <Typography gutterBottom>
                  {university_name}
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
                    Tentative Commision &nbsp;: &nbsp;
                    <CustomChip label="CAD 459" status={true} />
                  </Typography>
                  <Grid item>
                    <Button variant="contained"
                    >Apply Now</Button>
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
