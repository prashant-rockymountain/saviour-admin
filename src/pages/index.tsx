import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../configs/g_hooks/useAuth";
import FallbackSpinner from "src/configs/theme/components/spinner";

export const getHomeRoute = (role: string) => {
  if (role === "client") return "/acl";
  else return "/home";
};

const Home = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role.value);
      router.replace(homeRoute);
    }
  }, []);

  return <FallbackSpinner />;
};

export default Home;
