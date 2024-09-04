import axios from "axios";
import { getToken } from "../helper_functions/helperFunction";
import { ApiUrl } from "./apiUrls";
import { ApiStatus } from "../g_constants/allConstants";
import { errorToast } from "../g_components/g_toaster";

const axi = axios.create({
  baseURL: ApiUrl.BASE_URL,
});

axi.interceptors.request.use(
  (config) => {
    console.log(config, "CONFIIIII");
    const token = getToken();

    // const token = getToken();
    config.headers = token
      ? config.url.includes("_search")
        ? {
            ...config.headers,
          }
        : {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          }
      : {
          ...config.headers,
        };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axi.interceptors.response.use(
  function (response) {
    console.log(response, "apierror_response");

    if (response.status === ApiStatus.STATUS_200) {
      return response;
    } else if (response.status === ApiStatus.STATUS_403) {
      window.location.href = "/403";
      errorToast({ title: response.data?.message });
      return response;
    } else {
      errorToast({ title: response.data?.message });
      return response;
    }
  },
  function (error) {
    if (error?.response?.status === ApiStatus.STATUS_403) {
      window.location.href = "/403";
      errorToast({ title: response.data?.message });
      return error?.response;
    } else {
      errorToast({ title: error?.response?.data?.message });

      return Promise.reject(error);
    }
  }
);

export default axi;
