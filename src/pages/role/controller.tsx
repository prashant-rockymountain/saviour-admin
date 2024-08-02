import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";

export default class RoleController {
  getRole = async () => {
    let result = await axi.get(ApiUrl.GET_ROLE_URL);
    return result;
  };
  addRole = async ({ payload }: { payload: any }) => {
    const data = await axi.post(ApiUrl.ADD_ROLE_URL, payload);
    return data;
  };

  editRole = async ({ payload, id }: { payload: any; id: string }) => {
    const data = await axi.put(`${ApiUrl.EDIT_ROLE_URL}${id}`, payload);
    return data;
  };
}
