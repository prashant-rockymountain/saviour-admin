import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterSearch } from "src/configs/g_components/filterSearch";
import { UniversityCard } from "src/configs/g_components/UniversityCard";
import { useQuery } from "@tanstack/react-query";
import CourseFinderController from "./controller";
export interface LocationIdObj {
  country: string[];
  city: string[];
  state: string[];
}
const CourseFinder = () => {
  const [locationIdArr, setLocationIdArr] = useState<LocationIdObj>({
    country: [],
    city: [],
    state: [],
  });
  const courseFinderController = new CourseFinderController();
  const { data } = useQuery({
    queryKey: ["filterCountries", locationIdArr],

    queryFn: () =>
      courseFinderController.getAllFilteredLocations({
        city: locationIdArr.city,
        country: locationIdArr.country,
        state: locationIdArr.state,
      }),
      placeholderData: (previousData, previousQuery) => previousData
  });
  const locations = data?.data;

  function handleCheckBoxChange(type: keyof LocationIdObj, id: string) {
    if (locationIdArr[type].includes(id)) {
      setLocationIdArr((pre) => ({
        ...pre,
        [type]: pre[type].filter((item) => item !== id),
      }));
    } else {
      setLocationIdArr((pre) => ({
        ...pre,
        [type]: [...locationIdArr[type], id],
      }));
    }
  }

  console.log(locationIdArr, "LOCATION");

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2.5}>
          <Card>
            <CardContent>
              <Typography p={2}>Filter</Typography>
              <FormGroup sx={{ ml: 5 }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Only Open Programs"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Co op Programs"
                />
              </FormGroup>

              <Divider sx={{ my: 5 }} />

              <Grid item xs={12}>
                <Accordion
                  defaultExpanded
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Country
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      {locations?.data?.map((country: Record<string, any>) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={country.states.length>0&&locationIdArr.country.includes(country._id)}
                              onChange={(e) =>
                                handleCheckBoxChange("country", country._id)  
                              }
                            />
                          }
                          label={country.name}
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    State
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      {locations?.data?.map((country: Record<string, any>) =>
                        country.states.map((stat: Record<string, any>) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  stat.cities.length !== 0 &&
                                  locationIdArr.state.length !== 0
                                }
                                onChange={(e) =>
                                  handleCheckBoxChange("state", stat._id)
                                }
                              />
                            }
                            label={stat.name}
                          />
                        ))
                      )}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    City
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      {locations?.data?.map((country: Record<string, any>) =>
                        country.states.map((stat: Record<string, any>) =>
                          stat.cities.map((city: Record<string, any>) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) =>
                                    handleCheckBoxChange("city", city._id)
                                  }
                                />
                              }
                              label={city.name}
                            />
                          ))
                        )
                      )}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    University/College
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Only Open Programs"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Co op Programs"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Program Type
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Only Open Programs"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Co op Programs"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Course Length
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Only Open Programs"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Co op Programs"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
              <Grid item xs={12}>
                <Accordion
                  sx={{
                    "&.MuiAccordion-root": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Campus
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup sx={{ ml: 5 }}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Only Open Programs"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Co op Programs"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 5 }} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <FilterSearch />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <UniversityCard />
            </Grid>
            <Grid item xs={12}>
              <UniversityCard />
            </Grid>
            <Grid item xs={12}>
              <UniversityCard />
            </Grid>
            <Grid item xs={12}>
              <UniversityCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default CourseFinder;
