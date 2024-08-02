import Head from "next/head";
import { Router } from "next/router";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";
import themeConfig from "../configs/themeConfig";
import ThemeComponent from "../configs/theme/ThemeComponent";
import { ToastContainer } from "react-toastify";
import WindowWrapper from "../configs/layouts/window_wrapper";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import {
  SettingsConsumer,
  SettingsProvider,
} from "../configs/g_contexts/settingsContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createEmotionCache } from "../configs/theme/create-emotion-cache";
import UserLayout from "../configs/layouts/UserLayout";
import { AuthProvider } from "../configs/g_contexts/AuthContext";
import { NextPage } from "src/configs/g_types/types";
import {
  AbilityProvider,
  defaultACLObj,
} from "src/configs/g_contexts/AbilityContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "src/reduxStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../styles/globals.css";
import { useState } from "react";
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const App = (props: ExtendedAppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 10,
          },
        },
      })
  );
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const LayoutWrapper =
    Component.getLayout ??
    ((page) => (
      <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
    ));
  const setConfig = Component.setConfig ?? undefined;
  const aclAbilities = Component.acl ?? defaultACLObj;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName}`}</title>
        <meta
          name="description"
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta
          name="keywords"
          content="Material Design, MUI, Admin Template, React Admin Template"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistedStore} loading={null}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <SettingsProvider
                {...(setConfig ? { pageSettings: setConfig() } : {})}
              >
                <SettingsConsumer>
                  {({ settings }) => {
                    return (
                      <ThemeComponent settings={settings}>
                        <WindowWrapper>
                          <AbilityProvider aclAbilities={aclAbilities}>
                            {LayoutWrapper(<Component {...pageProps} />)}
                            <ToastContainer />
                          </AbilityProvider>
                        </WindowWrapper>
                      </ThemeComponent>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
};

export default App;
