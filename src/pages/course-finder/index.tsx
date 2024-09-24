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
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { elRequest } from "src/configs/api/handleElasticSearch";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addeditdata } from "src/reduxStore/editDataSlice";
import FilterSidebar from "src/configs/g_components/filterSidebar";
import CourseFinderController from "./controller";

interface filterObj {
  country: string[];
  city: string[];
  state: string[];
  universityName: string[];
  programType: string[];
  courseDuration: string[];
  onlyco_open: boolean;
  co_open: boolean;
}

const CourseFinder = () => {
  const courseFinderController = new CourseFinderController();

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [filterationObj, setFilterationObj] = useState<filterObj>({
    country: [],
    city: [],
    state: [],
    universityName: [],
    programType: [],
    courseDuration: [],
    onlyco_open: true,
    co_open: true,
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

  const {data:Courses,isPending:CourseLoading}=useQuery({
    queryKey:["FilterCourses",filterationObj],
    queryFn:()=>courseFinderController.getAllFilteredCourses({
      city:filterationObj.city,
      country:filterationObj.country,
      co_open:filterationObj.co_open,
      onlyco_open:filterationObj.onlyco_open,
      courseDuration:filterationObj.courseDuration,
      is_active:true,
      programType:filterationObj.programType,
      state:filterationObj.state,
      university:filterationObj.universityName

    }),
    // placeholderData: (previousData) => previousData,
  })

  function handleChange(key: keyof filterObj, id: string) {
    const copy = JSON.parse(JSON.stringify(filterationObj));

    if (copy[key].includes(id)) {
      copy[key] = copy[key].filter((item: string) => item !== id);
    } else {
      copy[key].push(id);
    }

    setFilterationObj({ ...copy });
  }
function handleBoolChange(key:"onlyco_open"|"co_open"){
setFilterationObj((pre)=>({...pre,[key]:!pre[key]}))
}
  function handlePagination(_: any, val: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", `${val}`);
    replace(`${pathname}?${params.toString()}`);
  }

return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2.5}>
          <FilterSidebar
            handleChange={handleChange}
            handleBoolChange={handleBoolChange}
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
            {CourseLoading ? (
              <Grid item xs={12} textAlign={"center"}>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                {Courses?.map((item: Record<string, any>) => (
                  <Grid item xs={12} key={item._id}>
                    <UniversityCard
                      image={item.university.university_logo}
                      university_name={item.university.name.name}
                      name={item.name}
                      campus_name={item?.university?.location?.city?.name}
                      data={{
                        course_details: {
                            ...item.course_id,
                          price: item?.price,
                          program: item?.graduation_type,
                        },
                        university_details: item?.university,
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
