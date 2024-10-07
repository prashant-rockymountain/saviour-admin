import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
} from "@mui/material";
import React, {  useCallback, useMemo, useState } from "react";
import FilterSearch  from "src/configs/g_components/filterSearch";
import { UniversityCard } from "src/configs/g_components/UniversityCard";
import { usePathname, useSearchParams } from "next/navigation";

import { useRouter } from "next/router";

const FilterSidebar=dynamic(()=>import("src/configs/g_components/filterSidebar"),{loading:()=><p>Loading.......</p>})
import CourseFinderController from "./controller";
import dynamic from "next/dynamic";

export interface filterObj {
  country: string[];
  city: string[];
  state: string[];
  universityName: string[];
  programType: string[];
  courseDuration: string[];
  third_party: boolean;
  is_partner: boolean;
  searchData:string[]
}

const CourseFinder = () => {
  const courseFinderController = new CourseFinderController();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
console.log(searchParams.get("search"));

  const [filterationObj, setFilterationObj] = useState<filterObj>({
    country: [],
    city: [],
    state: [],
    universityName: [],
    programType: [],
    courseDuration: [],
    third_party: true,
    is_partner: true,
    searchData:[]
    
  });



  // const {data:Courses,isPending:CourseLoading}=useQuery({
  //   queryKey:[`FilterCourses${searchParams.get("search")??1}`,filterationObj],
  //   queryFn:()=>courseFinderController.getAllFilteredCourses({
  //     city:filterationObj.city,
  //     country:filterationObj.country, 
  //     third_party:filterationObj.third_party,
  //     is_partner:filterationObj.is_partner,
  //     courseDuration:filterationObj.courseDuration,
  //     programType:filterationObj.programType,
  //     state:filterationObj.state,
  //     university:filterationObj.universityName,
  //     searchData:filterationObj.searchData,
  //     page:`${searchParams.get("search")??1}`

  //   }),

  // })
  const handleChange = useCallback((key:keyof filterObj, id:string) => {
    if(key=="is_partner"||key=="third_party") return 
    setFilterationObj((prev) => {
      const copy:filterObj = { ...prev };
      if (copy[key].includes(id)) {
        copy[key] = copy[key].filter((item) => item !== id);
      } else {
        copy[key].push(id);
      }
      return copy;
    });
  }, []);

  
//   function handleChange(key: keyof filterObj, id: string) {
//     if(key=="third_party"||key=="is_partner") return 
//     const copy:filterObj = JSON.parse(JSON.stringify(filterationObj));

//     if (copy[key].includes(id)) {
//       copy[key] = copy[key].filter((item: string) => item !== id);
//     } else {
//       copy[key].push(id);
//     }
// setFilterationObj({ ...copy });

//   }
  function handleBoolChange(key: "third_party" | "is_partner") {
    setFilterationObj((pre) => ({ ...pre, [key]: !pre[key] }));
  }
  function handlePagination(_: any, val: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", `${val}`);
    replace(`${pathname}?${params.toString()}`);
  }
  
const CourseLoading=false;
const Courses=[]

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
                  <FilterSearch  setFilterationObj={setFilterationObj}/>
                </CardContent>
              </Card>
            </Grid>
            {CourseLoading ? (
              <Grid item xs={12} textAlign={"center"}>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                {[]?.map((item: Record<string, any>) => (
                  <Grid item xs={12} key={item._id}>
                    <UniversityCard
                      image={item.university.university_logo}
                      university_name={item.university.name.name}
                      name={item.name}
                      commision={{type:item.university.commission_type,amount:item.university.commission}}
                      duration={item.duration}
                      campus_name={item?.university?.location?.city?.name}
                      intake={item.intake}
                      data={{
                        course_details: {
                          name: item?.name,
                          _id: item?._id,
                          price: item?.price,
                          program: item?.graduation_type,
                        },
                        university_details: item?.university,
                      }}
                    />
                  </Grid>
                ))}
                {Courses?.length > 0 && (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", placeContent: "center" }}
                  >
                    <Pagination
                      defaultPage={+(searchParams.get("search")??1)}
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
