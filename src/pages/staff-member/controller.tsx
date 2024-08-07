import { ApiUrl } from "src/configs/api/apiUrls";
import axi from "src/configs/api/AxiosInterseptor";
export default class StaffController {
  getStaffMember = async () => {
    let result = await axi.get(ApiUrl.GET_STAFF_MEMBER_URL);
    return result;
  };
  addStaffMember = async ({ payload }: { payload: any }) => {
    const data = await axi.post(ApiUrl.ADD_STAFF_MEMBER_URL, payload);
    return data;
  };

  editStaffMember = async ({ payload, id }: { payload: any; id: string }) => {
    const data = await axi.put(`${ApiUrl.EDIT_STAFF_MEMBER_URL}${id}`, payload);
    return data;
  };
}
