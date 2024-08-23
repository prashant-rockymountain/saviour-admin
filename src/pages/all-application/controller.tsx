import { Http } from "@mui/icons-material";
import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class ApplicationController {
  addStudent = async (payload: any) => {
    const data = await axi.post(ApiUrl.ADD_STUDENT_URL, payload);
    return data;
  };
}
