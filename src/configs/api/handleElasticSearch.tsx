import { ApiUrl } from "./apiUrls";
import axi from "./AxiosInterseptor";


export const elRequest = async ( payload:any ) => {
    
    let result = await axi.post(`${ApiUrl.EL_BASE_URL}`,payload )
    return result?.data.hits?.hits
}

