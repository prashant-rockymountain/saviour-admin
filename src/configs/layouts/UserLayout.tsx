import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSettings } from "../g_hooks/useSettings";
import VerticalNavItems from "../navigation/vertical";
import { LayoutProps } from "../g_types/types";
import VerticalLayout from "./VerticalLayout";

const UserLayout = (props: any) => {
  const { settings, saveSettings } = useSettings();
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  let updatedprops: LayoutProps = {
    ...props,
    saveSettings: saveSettings,
    hidden: hidden,
    settings: settings,
    contentHeightFixed: props?.contentHeightFixed,
    verticalLayoutProps: {
      navMenu: {
        navItems: VerticalNavItems(),
      },
    },
  };

  if (hidden && settings.layout === "horizontal") {
    settings.layout = "vertical";
  }

  return <VerticalLayout {...updatedprops}>{props.children}</VerticalLayout>;
};

export default UserLayout;
