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
   async  getAllFilteredCity({state,page,name}:{state:string[],page:number,name:string}){
   
    
const data=await axi.get(
    `${ApiUrl.GET_CITIES_URL}?state=${state.toString()}&page=${page}&limit=${page*50}&city_name=${name}`)
return data?.data?.data

    }
   async  getAllFilteredUniversities({city,state,country}:{city:string[],country:string[],state:string[]}){
const data=await axi.get(
    `${ApiUrl.CAMPUS_FILTER_LIST}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}`
)

return data?.data?.data

    }
   async  getAllFilteredCourses({city,state,country,university,is_partner,third_party,programType,courseDuration,searchData,page}:{city:string[],country:string[],state:string[],university:string[],is_partner:boolean,third_party:boolean,programType:string[],courseDuration:string[],searchData:string[],page:string}){
const data=await axi.get(
    `${ApiUrl.GET_FILTERED_COURSES}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}${`&university_name=${university.length?university.toString():""}`}${`&is_partner=${is_partner??""}`}${`&third_party=${third_party??""}`}${`&program_name=${programType.length?programType.toString():""}`}${`&duration=${courseDuration.length?courseDuration.toString():""}`}${`&q=${searchData.toString()}`}${`&is_active=true`}${`&page=${page}`}`
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
