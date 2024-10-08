import { Box, Card, CardContent, Divider, Grid, Skeleton } from "@mui/material";
import React from "react";

const FilterSkeleton = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Skeleton variant="text" width={"100%"} />
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
            <Skeleton variant="text" width={"70%"} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
            <Skeleton variant="text" width={"70%"} />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="text" width={"80%"} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="text" width={"80%"} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="text" width={"80%"} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="text" width={"80%"} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="text" width={"80%"} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Skeleton variant="text" width={"80%"} />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={15}
              height={15}
              sx={{ borderRadius: "2px" }}
            />
          </Box>
          <Grid item xs={12}>
            <Divider sx={{ my: 5 }} />
          </Grid>   
        </CardContent>
      </Card>
    </>
  );
};

export default FilterSkeleton;
