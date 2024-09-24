import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class InqueryController {
  getAllApplication = async () => {
    const data = await axi.get(ApiUrl.GET_ALL_APPLICATION_URL);
    return data?.data;
  };
  getInqueryProfile = async (payload: any) => {
    const data = await axi.get(ApiUrl.GET_INQUERY_PROFILE_URL + payload);
    return data?.data;
  };

  getApplicationProfile = async (payload: any) => {
    const data = await axi.get(ApiUrl.APPLICATION_PROFILE_URL + payload);
    return data?.data?.data;
  };
}
