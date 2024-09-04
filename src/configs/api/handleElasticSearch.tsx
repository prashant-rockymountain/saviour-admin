import { ApiUrl } from "./apiUrls";
import axi from "./AxiosInterseptor";


export const elRequest = async ( payload:any ) => {
    
    let result = await axi.post(`${ApiUrl.ELASTIC_TEST}`,payload )
    return result
}

