import {
  AccordionDetails,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { debounce } from "../helper_functions/helperFunction";
import { useInfiniteQuery } from "@tanstack/react-query";
import CourseFinderController from "src/pages/course-finder/controller";

const CitiesComponent = ({ ...props }) => {
  const courseFinderController = new CourseFinderController();
  const [citySearch, setCitySearch] = useState<string>("");
  const { handleChange, filterationObj } = props;
  const {
    data: paginationData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cityList", filterationObj.state, citySearch],
    queryFn: ({ pageParam = 1 }) =>
      courseFinderController.getAllFilteredCity({
        state: filterationObj.state,
        page: pageParam,
        name: citySearch,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return +lastPage.currentPage + 1;
    },
  });

  function handleScroll(e: any) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollHeight - 500 < scrollTop + clientHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }
  function handleCityChange(e: any) {
    setTimeout(() => {
      setCitySearch(e.target.value);
    }, 400);
  }
  const cityList =paginationData?.pages[paginationData.pageParams.length - 1].cities;

  return (
    <>
      <Grid item xs={12} sx={{ p: 3 }}>
        <TextField
          size="small"
          onChange={handleCityChange}
          placeholder="Search city"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <AccordionDetails
          onScroll={debounce(handleScroll, 350)}
          sx={{
            height: "35vh",
            overflowY: "scroll",
            pt: 1,
            pl: 5,
          }}
        >
          <FormGroup>
            {cityList?.map((city: Record<string, any>) => (
              <FormControlLabel
                key={city._id}
                control={
                  <Checkbox
                    checked={filterationObj.city.includes(city._id)}
                    onChange={(e) => handleChange("city", city._id)}
                  />
                }
                label={(city.name as string).toCapitalize()}
              />
            ))}
            {isFetchingNextPage && (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                <CircularProgress size={16} />
                <span>Loading .....</span>
              </p>
            )}
          </FormGroup>
        </AccordionDetails>
      </Grid>
    </>
  );
};

export default CitiesComponent;
