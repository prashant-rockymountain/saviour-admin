import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";
export default class RoleoptionController {
  getRoleOptionList = async () => {
    let result = await axi.get(ApiUrl.GET_ROLE_OPTION_URL);
    return result;
  };
  addRoleOptionList = async ({ payload }: { payload: any }) => {
    const data = await axi.post(ApiUrl.ADD_ROLE_OPTION_URL, payload);
    return data;
  };

  editRoleOptionList = async ({
    payload,
    id,
  }: {
    payload: any;
    id: string;
  }) => {
    const data = await axi.put(`${ApiUrl.EDIT_ROLE_OPTION_URL}${id}`, payload);
    return data;
  };
}
