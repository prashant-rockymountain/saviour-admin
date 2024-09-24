import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class UniversityController {
  getUniversityList = async ({ is_active }: { is_active?: boolean }) => {
    const data = await axi.get(
      `${ApiUrl.GET_UNIVERSITY_LIST_URL}${is_active ? "?is_active=true" : ""}`
    );
    return data?.data?.data;
  };

  getUniversity = async (id: string) => {
    const data = await axi.get(`${ApiUrl.GET_UNIVERSITY_URL}${id}`);
    return data?.data;
  };


  getUniversityProfile = async ({ id }: { id: string }) => {
    const data = await axi.get(`${ApiUrl.ADMIN_UNIVERSITY_PROFILE_URL}${id}`);
    return data?.data?.data
  }

  getUniversityCourse = async(boydata:Record<string,any>)=>{
    const data = await axi.post(`${ApiUrl.ADMIN_UNIVERSITY_COURSE_URL}`,boydata);
    return data?.data?.data;
  }

  // addUniversity = async (payload: any) => {
  //   const data = await axi.put(ApiUrl.ADD_UNIVERSITY_URL, payload);
  //   return data;
  // };

  // editUniversity = async ({ id, payload }: { id: string; payload: any }) => {
  //   const data = await axi.put(`${ApiUrl.EDIT_UNIVERSITY_URL}${id}`);
  //   return data;
  // };
}
