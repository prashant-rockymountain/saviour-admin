import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterSearch } from "src/configs/g_components/filterSearch";
import { UniversityCard } from "src/configs/g_components/UniversityCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import CourseFinderController from "./controller";
import { usePathname, useSearchParams } from "next/navigation";
import { elRequest } from "src/configs/api/handleElasticSearch";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";

interface LocationIdObj {
  country: Record<string, Array<string>>;
  city: Record<string, Array<string>>;
  state: Record<string, Array<string>>;
}
interface UniFilterObj {
  universityName: string[];
  programType: string[];
  courseDuration: string[];
  onlyco_open: Boolean;
  co_open: Boolean;
}
interface filterObj {
  locations: LocationIdObj;
  Universities: UniFilterObj;
}

const CourseFinder = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const courseLength = ["1", "1.5", "2", "3", "4", "5"];
  const [filterationObj, setFilterationObj] = useState<filterObj>({
    locations: {
      country: {
        name: [],
        ids: [],
      },
      city: {
        name: [],
        ids: [],
      },
      state: {
        name: [],
        ids: [],
      },
    },
    Universities: {
      universityName: [],
      programType: [],
      courseDuration: [],
      onlyco_open: false,
      co_open: false,
    },
  });
  // const [searchObj, setSearchObj] = useState<Record<string, string>>({
  //   country: "",
  //   state: "",
  //   city: "",
  // });

  const courseFinderController = new CourseFinderController();
  const { data: programData } = useQuery({
    queryKey: ["program"],
    queryFn: () => courseFinderController.getProgramTypeList("?is_active=true"),
  });

  const { data } = useQuery({
    queryKey: ["filterCountries", filterationObj.locations],
    queryFn: () =>
      courseFinderController.getAllFilteredLocations({
        city: filterationObj.locations.city.ids,
        country: filterationObj.locations.country.ids,
        state: filterationObj.locations.state.ids,
      }),

    placeholderData: (previousData) => previousData,
  });

  const { data: universityData } = useQuery({
    queryKey: ["filterUniversities", filterationObj.locations],
    queryFn: () =>
      courseFinderController.getAllFilteredUniversities({
        city: filterationObj.locations.city.ids,
        country: filterationObj.locations.country.ids,
        state: filterationObj.locations.state.ids,
      }),

    placeholderData: (previousData) => previousData,
  });
  const {
    mutate,
    data:  ElasticData,
    isPending,
  } = useMutation({ mutationKey: ["elastic"], mutationFn: elRequest });
  function sendPayload(payloadObj?: filterObj ) {
    let locationNewArr, UniversityNewArr, payload;
    locationNewArr = Object.entries(payloadObj!.locations).filter(
        (item) => item[1].name.length > 0
      );
      UniversityNewArr = Object.entries(payloadObj!.Universities).filter(
        (item) => item[1].length > 0
      );
      console.log(UniversityNewArr,"UNI");
      
      payload = 
     !( locationNewArr.length>0||UniversityNewArr.length>0)?
      {
        from: 0,
        size: 10,
        query: {
          bool: {
            must: [],
            filter: [],
          }
        }}:{
        from: +searchParams.get("search")!,
        size: 10,
        query: {
          bool: {
            must: [],
            filter: [
              ...locationNewArr!.map((item:any) => ({
                terms: {
                  [`university.location.${item[0]}.name`]: item[1].name,
                },
              })),
              ...UniversityNewArr!.map((university:any) =>
                university[0] == "universityName"
                  ? {
                      terms: {
                        [`university.name.name`]: university[1],
                      },
                    }
                  : university[0] == "onlyco_open"
                  ? {
                      terms: {
                        [`university.onlyco_open`]: university[1],
                      },
                    }
                  : university[0] == "co_open"
                  ? {
                      terms: {
                        [`university.co_open`]: university[1],
                      },
                    }
                  : university[0] == "programType"
                  ? {
                      nested: {
                        path: "course_details",
                        query: {
                          bool: {
                            must: [
                              {
                                terms: {
                                  "course_details.graduation_type.program_type":
                                    university[1],
                                },
                              },
                            ],
                          },
                        },
                      },
                    }
                  : {
                      nested: {
                        path: "course_details.courses",
                        query: {
                          bool: {
                            must: [
                              {
                                terms: {
                                  "course_details.courses.course_id.duration":
                                    university[1],
                                },
                              },
                            ],
                          },
                        },
                      },
                    }
              ),
            ],
          },
        }
      };




    mutate(payload as any);
  }

  function handleChange(
    key: keyof filterObj,
    type: keyof LocationIdObj | keyof UniFilterObj,
    id?: string | undefined,
    name?: string
  ) {
    const copy = JSON.parse(JSON.stringify(filterationObj));
    if (key === "locations") {
      if (copy[key][type]["name"].includes(name)) {
        copy[key][type]["name"] = copy[key][type]["name"].filter(
          (item: string) => item !== name
        );
      } else {
        copy[key][type]["name"].push(name);
      }
      if (copy[key][type]["ids"].includes(id)) {
        copy[key][type]["ids"] = copy[key][type]["ids"].filter(
          (item: string) => item !== id
        );
      } else {
        copy[key][type]["ids"].push(id);
      }
    } else {
      if (type !== "co_open" && type !== "onlyco_open") {
        if (copy[key][type].includes(name)) {
          copy[key][type] = copy[key][type].filter(
            (item: string) => item !== name
          );
        } else {
          copy[key][type].push(name);
        }
      } else {
        copy[key][type] = !copy[key][type];
      }
    }
    sendPayload(copy);
    setFilterationObj({ ...copy });
  }
  // function handleSearch(val: string, type: string) {
  //   setSearchObj((pre) => ({ ...pre, [type]: val }));
  // }
  function handlePagination(_: any, val: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", `${val}`);
    replace(`${pathname}?${params.toString()}`);
  }
  const locations = data?.data;
  const universities = universityData?.data?.data;
  const allPrograms = programData?.data?.data;
  const AllCourses = ElasticData?.data.hits?.hits;
  const disptach = useDispatch();
  useEffect(() => {
    disptach(addeditdata(null));
    sendPayload(filterationObj);
  }, [searchParams]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2.5}>
          <Card>
            <CardContent>
              <Typography p={2}>Filter</Typography>
              <FormGroup sx={{ ml: 5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        handleChange("Universities", "onlyco_open")
                      }
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
                          {locations?.data?.map(
                            (country: Record<string, any>) => (
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
                                label={country.name}
                              />
                            )
                          )}
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
                        placeholder="Search states"
                      />
                    </Grid>
                  </Grid>
                  <AccordionDetails
                    sx={{ height: "35vh", overflowY: "scroll", pt: 1, pl: 5 }}
                  >
                    <FormGroup sx={{ ml: 0 }}>
                      {locations?.data?.map((country: Record<string, any>) =>
                        country.states.map((stat: Record<string, any>) => (
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
                    City / Campus
                  </AccordionSummary>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ p: 3 }}>
                      <TextField
                        size="small"
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
                          {locations?.data?.map(
                            (country: Record<string, any>) =>
                              country.states.map((stat: Record<string, any>) =>
                                stat.cities.map((city: Record<string, any>) => (
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
                                    label={city.name}
                                  />
                                ))
                              )
                          )}
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
                              label={uni?.name}
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
                                checked={filterationObj.Universities.programType
                                  .includes(pro.program_type)
                                }
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
                            label={pro.program_type}
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
                            checked={filterationObj.Universities.courseDuration.includes(item)}
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
                          label={item}
                        />
                      ))}
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
            {isPending ? (
              <Grid item xs={12} textAlign={"center"}>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                {AllCourses?.map((item: Record<string, any>) =>
                  item._source.course_details?.map(
                    (courses: Record<string, any>) =>
                      courses?.courses.map(
                        (innerCourse: Record<string, any>) => (
                          <Grid item xs={12}>
                            <UniversityCard
                              image={item._source.university.university_logo}
                              university_name={
                                item._source.university.name.name
                              }
                              name={innerCourse.name}
                              program={""}
                              data={{
                                course_details: {
                                  ...innerCourse,
                                  program: courses?.graduation_type,
                                },
                                university_details: item?._source?.university,
                              }}
                            />
                          </Grid>
                        )
                      )
                  )
                )}
                {AllCourses?.length > 0 && (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", placeContent: "center" }}
                  >
                    <Pagination
                    defaultPage={+searchParams.get("search")!}
                      count={10}
                      variant="outlined"
                      shape="rounded"
                      onChange={handlePagination}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default CourseFinder;
