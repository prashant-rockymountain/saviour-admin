import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilterSearch } from "src/configs/g_components/filterSearch";
import { UniversityCard } from "src/configs/g_components/UniversityCard";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { elRequest } from "src/configs/api/handleElasticSearch";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import FilterSidebar from "src/configs/g_components/filterSidebar";

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
  const disptach = useDispatch();

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

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

  const {
    mutate,
    data: AllCourses,
    isPending,
  } = useMutation({
    mutationKey: ["elastic"],
    mutationFn: elRequest,
    onError(err) {
      console.log(err);
    },
  });
  function sendPayload(payloadObj?: filterObj) {
    let locationNewArr, UniversityNewArr, payload;
    locationNewArr = Object.entries(payloadObj!.locations).filter(
      (item) => item[1].name.length > 0
    );
    UniversityNewArr = Object.entries(payloadObj!.Universities).filter(
      (item) => item[1].length > 0
    );
    console.log(UniversityNewArr, "UNI");

    payload = !(locationNewArr.length > 0 || UniversityNewArr.length > 0)
      ? {
          from: 0,
          size: 10,
          query: {
            bool: {
              must: [],
              filter: [],
            },
          },
        }
      : {
          from: +searchParams.get("search")!,
          size: 10,
          query: {
            bool: {
              must: [],
              filter: [
                ...locationNewArr!.map((item: any) => ({
                  terms: {
                    [`university.location.${item[0]}.name`]: item[1].name,
                  },
                })),
                ...UniversityNewArr!.map((university: any) =>
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
          },
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
    
    setTimeout(()=>{
      sendPayload(copy);
    },500)
    setFilterationObj({ ...copy });
  }


  function handlePagination(_: any, val: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", `${val}`);
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    disptach(addeditdata(null));
    sendPayload(filterationObj);
  }, [searchParams]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2.5}>
          <FilterSidebar
            handleChange={handleChange}
  
            filterationObj={filterationObj}
          />
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
                {AllCourses?.map((item: Record<string, any>) => (
                  <Grid item xs={12} key={item._id}>
                    <UniversityCard
                      image={item._source.university.university_logo}
                      university_name={item._source.university.name.name}
                      name={item.name}
                      program={""}
                      data={{
                        course_details: {
                          _id: item?._source?.course_id?._id,
                          name: item?._source?.name,
                          intake: item?._source?.intake,
                          price: item?._source?.price,
                          program: item?._source?.graduation_type,
                        },
                        university_details: item?._source?.university,
                      }}
                    />
                  </Grid>
                ))}
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
