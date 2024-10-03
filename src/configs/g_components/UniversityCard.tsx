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
import { ApiUrl } from "../api/apiUrls";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";

export const UniversityCard = ({
  image,
  campus_name,
  university_name,
  name,
  data,
  duration,
  intake,
}: {
  duration: number;
  intake: string[];
  image: string;
  campus_name: string;
  university_name: string;
  name: string;
  data: Record<string, any>;
}) => {
  const disptach = useDispatch();
  const router = useRouter();


  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box
              component={"img"}
              width={"100%"}
              sx={{ borderRadius: "6px" }}
              maxHeight={"80vh"}
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
          <Grid item xs={7}>
            <Typography variant="h6" fontSize={"1.1rem"}>
              <b> {name.toCapitalize()}</b>
            </Typography>
            <Typography gutterBottom>{university_name}</Typography>

            <Grid container spacing={5}>
              <Grid item>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography fontSize={"1.1rem"}>
                    <b>Program Type</b>
                  </Typography>
                  <CustomChip
                    status={true}
                    label={data?.course_details?.program?.program_type}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography fontSize={"1.1rem"}>
                    <b>Duration</b>
                  </Typography>
                  <CustomChip status={true} label={`${duration} years`} />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography fontSize={"1.1rem"}>
                    <b>App. Fees</b>
                  </Typography>
                  <CustomChip
                    status={true}
                    label={`$${data?.course_details?.price}`}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography fontSize={"1.1rem"}>
                    <b>Campus</b>
                  </Typography>
                  <CustomChip
                    status={true}
                    label={campus_name.toCapitalize()}
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                pt={2}
                color={textcolor.primary_text}
                component={"span"}
              >
                Tentative Commision &nbsp;: &nbsp;
                <CustomChip label="CAD 459" status={true} />
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                float: "right",
              }}
            >
              {(intake as string[]).toMonthSort().map((item, ind) => (
                <CustomChip status={true} key={ind} label={`${item}(open)`} />
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} pb={6}>
          <Button
            variant="contained"
            sx={{ float: "right" }}
            onClick={() => {
              disptach(addeditdata(data)), router.push("/stepperForm");
            }}
          >
            Apply Now
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};
