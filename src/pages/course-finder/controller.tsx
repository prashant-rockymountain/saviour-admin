import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class CourseFinderController{
   async  getAllFilteredLocations({city,state,country}:{city:string[],country:string[],state:string[]}){
const data=await axi.get(
    `${ApiUrl.GET_FILTERED_LOCATION}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}`
)
return data

    }
   async  getAllFilteredCountry(){
const data=await axi.get(`${ApiUrl.GET_COUNTRY_URL}`)
return data?.data?.data

    }
   async  getAllFilteredState({country}:{country:string[]}){
const data=await axi.get(
    `${ApiUrl.GET_STATE_URL}?country=${country.toString()}`
)
return data?.data?.data

    }
   async  getAllFilteredCity({state}:{state:string[]}){
const data=await axi.get(
    `${ApiUrl.GET_CITIES_URL}?state=${state.toString()}`)
return data?.data?.data

    }
   async  getAllFilteredUniversities({city,state,country}:{city:string[],country:string[],state:string[]}){
const data=await axi.get(
    `${ApiUrl.CAMPUS_FILTER_LIS}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}`
)

return data?.data?.data

    }
   async  getAllFilteredCourses({city,state,country,university,onlyco_open,co_open,programType,courseDuration,is_active}:{city:string[],country:string[],state:string[],university:string[],onlyco_open:boolean,co_open:boolean,programType:string[],courseDuration:string[],is_active:boolean}){
const data=await axi.get(
    `${ApiUrl.GET_FILTERED_COURSES}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}${`&university_name=${university.length?university.toString():""}`}${`&onlyco_open=${onlyco_open??""}`}${`&co_open=${co_open??""}`}${`&programType=${programType.length?programType.toString():""}`}${`&courseDuration=${courseDuration.length?courseDuration.toString():""}`}${`&is_active=${is_active??""}`}`
)

return data?.data?.data

    }


    async getProgramTypeList(param:string){
        const data=await axi.get(`${ApiUrl.GRADUATION_LIST_URL}${param}`)
        return data?.data?.data
    }
    async getCampuName(param:string){
        const data=await axi.get(`${ApiUrl.CAPMUS_NAME_URL}${param}`)
        return data
    }

}
