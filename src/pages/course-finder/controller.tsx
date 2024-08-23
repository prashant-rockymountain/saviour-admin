import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class CourseFinderController{
   async  getAllFilteredLocations({city,state,country}:{city:string[],country:string[],state:string[]}){
const data=await axi.get( `${ApiUrl.GET_FILTERED_LOCATION}${country.length?`?country=${country.toString()}`:""}${city.length?`&city=${city.toString()}`:""}${state.length?`&state=${state.toString()}`:""}`)
return data

    }
}