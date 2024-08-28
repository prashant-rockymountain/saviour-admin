import { Http } from "@mui/icons-material";
import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class ApplicationController {
  addStudent = async (payload: any) => {
    const data = await axi.post(ApiUrl.ADD_STUDENT_URL, payload);
    return data;
  };
  updateStudent = async ({ payload, id }: { payload: any; id: string }) => {
    const data = await axi.put(ApiUrl.EDIT_STUDENT_URL + id, payload);
    return data;
  };

  getALLStudent = async () => {
    const data = await axi.get(ApiUrl.GET_ALL_STUDENT_URL);
    return data?.data;
  };
}
