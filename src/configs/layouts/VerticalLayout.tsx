import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import themeConfig from "../themeConfig";
import { LayoutProps } from "../g_types/types";
import ScrollToTop from "../theme/components/scroll-to-top";
import IconifyIcon from "../theme/components/icon";
import SiderbarNavigation from "./sidebarnavigation";
import LayoutAppBar from "./verticalappbar/appbar";
import LayoutFooter from "./footer";
import { useAuth } from "../g_hooks/useAuth";

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const VerticalLayout = (props: LayoutProps) => {
  const {
    settings,
    children,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    verticalLayoutProps,
  } = props;
  const { skin, contentWidth } = settings;
  const navigationBorderWidth = skin === "bordered" ? 1 : 0;
  const { navigationSize, collapsedNavigationSize } = themeConfig;
  const navWidth = navigationSize;
  const collapsedNavWidth = collapsedNavigationSize;
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const toggleNavVisibility = () => setNavVisible(!navVisible);
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);
 
  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        {/* ==========sidebar ========*/}

        <SiderbarNavigation
          navWidth={navWidth}
          navVisible={navVisible}
          setNavVisible={setNavVisible}
          collapsedNavWidth={collapsedNavWidth}
          toggleNavVisibility={toggleNavVisibility}
          navigationBorderWidth={navigationBorderWidth}
          verticalNavItems={verticalLayoutProps.navMenu.navItems}
          groupActive={groupActive}
          setGroupActive={setGroupActive}
          currentActiveGroup={currentActiveGroup}
          setCurrentActiveGroup={setCurrentActiveGroup}
          {...props}
        />
        {/*==================mainbody================== */}
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...(contentHeightFixed && { maxHeight: "100vh" }) }}
        >
          <LayoutAppBar
            toggleNavVisibility={toggleNavVisibility}
            appBarProps={verticalLayoutProps.appBar?.componentProps}
            {...props}
          />

          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...(contentHeightFixed && {
                overflow: "hidden",
                "& > :first-of-type": { height: "100%" },
              }),
              ...(contentWidth === "boxed" && {
                mx: "auto",
                "@media (min-width:1440px)": { maxWidth: "100%" },
                "@media (min-width:1200px)": { maxWidth: "100%" },
              }),
            }}
          >
            {children}
          </ContentWrapper>

          {/* <LayoutFooter footerStyles={footerProps?.sx} footerContent={footerProps?.content} {...props} /> */}
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className="mui-fixed">
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <IconifyIcon icon="tabler:arrow-up" />
          </Fab>
        </ScrollToTop>
      )}
    </>
  );
};

export default VerticalLayout;
