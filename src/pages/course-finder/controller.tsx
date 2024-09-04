import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class CourseFinderController{
   async  getAllFilteredLocations({city,state,country}:{city:string[],country:string[],state:string[]}){
const data=await axi.get(
    `${ApiUrl.GET_FILTERED_LOCATION}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}`
)
return data

    }
   async  getAllFilteredUniversities({city,state,country}:{city:string[],country:string[],state:string[]}){
const data=await axi.get(
    `${ApiUrl.GET_UNIVERSITY_LIST_URL}${`?country=${country.length?country.toString():""}`}${`&city=${city.length?city.toString():""}`}${`&state=${state.length?state.toString():""}`}`
)
console.log(data);

return data

    }
    async getProgramTypeList(param:string){
        const data=await axi.get(`${ApiUrl.GRADUATION_LIST_URL}${param}`)
        return data
    }
    async getCampuName(param:string){
        const data=await axi.get(`${ApiUrl.CAPMUS_NAME_URL}${param}`)
        return data
    }

}
