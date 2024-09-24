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
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import { useRouter } from "next/router";

export const ApplicationCard = ({ data }: { data: Record<string, any> }) => {
  const disptach = useDispatch();
  const router = useRouter();
  console.log(data, ",oxaij");
  const { name } = data?.program_name;
  const university_name = data?.program_name?.university?.location?.address;
  const university_logo = data?.program_name?.university?.university_logo;
  const { program_type } = data?.credentials;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box
              component={"img"}
              width={{
                xs: "30vw",
                sm: "19vw",
                md: "13vw",
                lg: "10vw",
                xl: "11vw",
              }}
              sx={{ borderRadius: "6px" }}
              src={ApiUrl.IMAGE_BASE_URL + university_logo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" fontSize={"1.1rem"}>
                  <b> {(name as string).toUpperCase()}</b>
                </Typography>
                <Typography gutterBottom>{university_name}</Typography>
              </Grid>
              <Grid container spacing={5}>
                <Grid item display={"flex"} direction={"column"} gap={2}>
                  <CustomChip
                    status={true}
                    label={data?.intake_month + " " + data?.intake_year}
                  />
                </Grid>
                <Grid item display={"flex"} direction={"column"} gap={2}>
                  <CustomChip status={true} label={program_type} />
                </Grid>
                <Grid item display={"flex"} direction={"column"} gap={2}>
                  <CustomChip status={true} label={data?.status} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              textAlign: { xs: "left", sm: "right" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Grid item>
              <CustomChip
                status={true}
                label={"Application Declined By Student"}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  //   disptach(addeditdata(data)),
                  router.push(
                    "/all-inquiries/profile_view_comment/" + data?._id
                  );
                }}
              >
                Track Application
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
