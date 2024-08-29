import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export class StepperFormController {
  getAllStream = async () => {
    const data = await axi.get(ApiUrl.GET_ALL_STREAMS_URL + "?is_active=true");
    return data?.data;
  };
}
