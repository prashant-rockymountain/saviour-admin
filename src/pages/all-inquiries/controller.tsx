import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export class AllApplicationController {
  getAllApplication = async () => {
    const data = await axi.get(ApiUrl.GET_ALL_APPLICATION_URL);
    return data?.data;
  };
}
