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
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CourseFinderController from "src/pages/course-finder/controller";
import { useQuery } from "@tanstack/react-query";
let defaultSearchVal:Record<string,string>={
  country:"",
  state:"",
  city:""
}
const FilterSidebar = ({ ...props }) => {
const [searchData,setSearchData]=useState<Record<string,string>>(defaultSearchVal)
  const courseFinderController = new CourseFinderController();
  const { handleChange,  filterationObj } = props;

  const courseLength = ["1", "1.5", "2", "3", "4", "5"];
  function handleSearch(value:string,key:string)
  {
setSearchData((pre)=>({...pre,[key]:value}))
  }
  const { data: allPrograms } = useQuery({
    queryKey: ["program"],
    queryFn: () => courseFinderController.getProgramTypeList("?is_active=true"),
  });

  const { data: countryList } = useQuery({
    queryKey: ["countriesList"],
    queryFn: courseFinderController.getAllFilteredCountry,
  });
  const { data: sateList } = useQuery({
    queryKey: ["stateList", filterationObj.locations.country],
    queryFn: () =>
      courseFinderController.getAllFilteredState({
        country: filterationObj.locations.country.ids,
      }),
  });
  const { data: cityList } = useQuery({
    queryKey: ["cityList", filterationObj.locations.state],
    queryFn: () =>
      courseFinderController.getAllFilteredCity({
        state: filterationObj.locations.state.ids,
      }),
  });

  const { data: universities } = useQuery({
    queryKey: ["filterUniversities", filterationObj.locations],
    queryFn: () =>
      courseFinderController.getAllFilteredUniversities({
        city: filterationObj.locations.city.ids,
        country: filterationObj.locations.country.ids,
        state: filterationObj.locations.state.ids,
      }),

    placeholderData: (previousData) => previousData,
  });
console.log(searchData,"data");

  return (
    <>
      <Card>
        <CardContent>
          <Typography p={2}>Filter</Typography>
          <FormGroup sx={{ ml: 5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleChange("Universities", "onlyco_open")}
                />
              }
              label="Only Open Programs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleChange("Universities", "co_open")}
                />
              }
              label="Co op Programs"
            />
          </FormGroup>

          <Divider sx={{ my: 5 }} />

          <Grid item xs={12}>
            <Accordion
              sx={{
                "&.MuiAccordion-root": {
                  boxShadow: "none",
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Country
              </AccordionSummary>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ p: 3 }}>
                  <TextField
                    fullWidth
                    onChange={(e) => handleSearch(e.target.value, "country")}
                    size="small"
                    placeholder="Search country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AccordionDetails
                    sx={{
                      height: "35vh",
                      overflowY: "scroll",
                      pt: 1,
                      pl: 5,
                    }}
                  >
                    <FormGroup>
                      {
                      
                   
                      countryList?.map((country: Record<string, any>) => (
                        (country.name as string).toCongest().includes((searchData.country as string).toCongest()) &&
                        <FormControlLabel
                          key={country._id}
                          control={
                            <Checkbox
                              checked={filterationObj.locations.country.ids.includes(
                                country._id
                              )}
                              onChange={(e) =>
                                handleChange(
                                  "locations",
                                  "country",
                                  country._id,
                                  country.name
                                )
                              }
                            />
                          }
                          label={(country.name as string).toCapitalize()}  
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Grid>
              </Grid>
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

              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ p: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    onChange={(e) => handleSearch(e.target.value, "state")}
                    placeholder="Search states"
                  />
                </Grid>
              </Grid>
              <AccordionDetails
                sx={{ height: "35vh", overflowY: "scroll", pt: 1, pl: 5 }}
              >
                <FormGroup sx={{ ml: 0 }}>
                  {sateList?.map((stat: Record<string, any>) => (
                              (stat.name as string).toCongest().includes((searchData.state as string).toCongest()) &&
                    <FormControlLabel
                      key={stat._id}
                      control={
                        <Checkbox
                          checked={filterationObj.locations.state.ids.includes(
                            stat._id
                          )}
                          onChange={(e) =>
                            handleChange(
                              "locations",
                              "state",
                              stat._id,
                              stat.name
                            )
                          }
                        />
                      }
                      label={(stat?.name as string).toCapitalize()}
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
                City / Campus
              </AccordionSummary>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ p: 3 }}>
                  <TextField
                    size="small"
                    onChange={(e) => handleSearch(e.target.value, "city")}
                    placeholder="Search city"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <AccordionDetails
                    sx={{
                      height: "35vh",
                      overflowY: "scroll",
                      pt: 1,
                      pl: 5,
                    }}
                  >
                    <FormGroup>
                      {cityList?.map((city: Record<string, any>) => (
                                 (city.name as string).toCongest().includes((searchData.city as string).toCongest())  &&
                        <FormControlLabel
                          key={city._id}
                          control={
                            <Checkbox
                              checked={filterationObj.locations.city.ids.includes(
                                city._id
                              )}
                              onChange={(e) =>
                                handleChange(
                                  "locations",
                                  "city",
                                  city._id,
                                  city.name
                                )
                              }
                            />
                          }
                          label={(city.name as string).toCapitalize()}
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Grid>
              </Grid>
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
                Universities
              </AccordionSummary>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ p: 3 }}>
                  <TextField
                    size="small"
                    placeholder="Search University"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <AccordionDetails
                    sx={{
                      height: "35vh",
                      overflowY: "scroll",
                      pt: 1,
                      pl: 5,
                    }}
                  >
                    {universities?.map((uni: Record<string, any>) => (
                      <FormGroup key={uni._id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filterationObj.Universities.universityName.includes(
                                uni.name
                              )}
                              onChange={(e) =>
                                handleChange(
                                  "Universities",
                                  "universityName",
                                  undefined,
                                  uni?.name
                                )
                              }
                            />
                          }
                          label={(uni?.name as string).toCapitalize()}
                        />
                      </FormGroup>
                    ))}
                  </AccordionDetails>
                </Grid>
              </Grid>
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
              <Grid container spacing={2}>
                <Grid item xs={12} p={3}>
                  <TextField
                    size="small"
                    placeholder="Search University"
                    fullWidth
                  />
                </Grid>

                <AccordionDetails
                  sx={{ height: "35vh", overflowY: "scroll", pt: 1, pl: 5 }}
                >
                  <FormGroup>
                    {allPrograms?.map((pro: Record<string, any>) => (
                      <FormControlLabel
                        key={pro._id}
                        control={
                          <Checkbox
                            checked={filterationObj.Universities.programType.includes(
                              pro.program_type
                            )}
                            onChange={(e) =>
                              handleChange(
                                "Universities",
                                "programType",
                                undefined,
                                pro.program_type
                              )
                            }
                          />
                        }
                        label={(pro.program_type as string).toCapitalize()}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
                <Grid item xs={12}></Grid>
              </Grid>
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
                  {courseLength.map((item: string) => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={filterationObj.Universities.courseDuration.includes(
                            item
                          )}
                          onChange={(e) =>
                            handleChange(
                              "Universities",
                              "courseDuration",
                              undefined,
                              item
                            )
                          }
                        />
                      }
                      label={item.toCapitalize()}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Divider sx={{ my: 5 }} />
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterSidebar;
