// ** React Import
import { useState } from "react";

// ** MUI Imports
import List from "@mui/material/List";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  LayoutProps,
  NavGroup,
  NavLink,
  NavSectionTitle,
} from "../../g_types/types";
import Drawer from "./Drawer";
import VerticalNavHeader from "./VerticalNavHeader";
import VerticalNavGroup from "./VerticalNavGroup";
import VerticalNavLink from "./VerticalNavLink";

interface Props {
  navWidth: number;
  navVisible: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps["hidden"];
  groupActive: string[];
  currentActiveGroup: string[];
  setGroupActive: (value: string[]) => void;
  setCurrentActiveGroup: (item: string[]) => void;
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  settings: LayoutProps["settings"];
  children: LayoutProps["children"];
  setNavVisible: (value: boolean) => void;
  saveSettings: LayoutProps["saveSettings"];
  verticalNavItems: LayoutProps["verticalLayoutProps"]["navMenu"]["navItems"];
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  height: theme.mixins.toolbar.minHeight,
  transition: "opacity .15s ease-in-out",
  "&.scrolled": {
    opacity: 1,
  },
}));

const SiderbarNavigation = (props: Props) => {
  const { navigationBorderWidth, verticalNavItems } = props;

  const [navHover, setNavHover] = useState<boolean>(false);

  const resolveNavItemComponent = (
    item: NavGroup | NavLink | NavSectionTitle | any
  ) => {
    if (item?.children?.length > 0) return VerticalNavGroup;
    return VerticalNavLink;
  };

  return (
    <Drawer
      {...props}
      navHover={navHover}
      setNavHover={setNavHover}
      navigationBorderWidth={navigationBorderWidth}
    >
      {/*============ siderbar logo================= */}
      <VerticalNavHeader {...props} navHover={navHover} />

      {/*=============== siderbar innerbody========== */}

      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <PerfectScrollbar>
          <List
            className="nav-items"
            sx={{ pt: 0, "& > :first-child": { mt: "0" } }}
          >
            {verticalNavItems?.map(
              (item: NavGroup | NavLink | NavSectionTitle, index: number) => {
                const TagName: any = resolveNavItemComponent(item);
                return (
                  <TagName
                    {...props}
                    navHover={navHover}
                    key={index}
                    item={item}
                  />
                );
              }
            )}
          </List>
        </PerfectScrollbar>
      </Box>
    </Drawer>
  );
};

export default SiderbarNavigation;
