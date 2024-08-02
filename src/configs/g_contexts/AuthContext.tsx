import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "../g_types/types";
import axi from "../api/AxiosInterseptor";
import { ApiUrl } from "../api/apiUrls";
import { ApiStatus } from "../g_constants/allConstants";
import { clearallstates } from "src/reduxStore/logoutallSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  errorToast,
  successToast,
  warningToast,
} from "../g_components/g_toaster";
import { userlogin } from "src/reduxStore/loginSlice";
import { useAuth } from "../g_hooks/useAuth";
import { Box, Button } from "@mui/material";

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  btnLoader: false,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const UserData = useSelector(
    (state: Record<string, any>) => state?.data?.userdata?.logindata?.userData
  );
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem("accessToken");
      if (storedToken) {
        setUser(UserData);
        setLoading(false);
      } else {
        setLoading(false);
        router.replace("/login");
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (params: LoginParams) => {
    setBtnLoading(true);
    let response = await axi.post(ApiUrl.LOGIN_URL, { ...params });
    if (response.status === ApiStatus.STATUS_200) {
      setBtnLoading(false);
      successToast({ title: "Login Successfully" });
      setUser(response.data.data.userData);
      localStorage.setItem("accessToken", response?.data.data?.access_token);
      dispatch(userlogin(response?.data?.data));
      router.push("/home");
    } else if (response.status === ApiStatus.STATUS_401) {
      setBtnLoading(false);

      warningToast({ title: response.data?.message });
    } else if (response.status === ApiStatus.STATUS_403) {
      setBtnLoading(false);

      errorToast({ title: response.data?.message });
    } else {
      setBtnLoading(false);

      errorToast({ title: response.data?.message });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoading(false);
    dispatch(clearallstates());
    window.localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");
    router.push("/login");
  };

  const handleRegister = (params: RegisterParams) => {};
  // if (!window.navigator.onLine) {
  //   router.push("/no-internet");
  //   // window.location.href = "/no-internet";
  // }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    btnLoader: btnLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
