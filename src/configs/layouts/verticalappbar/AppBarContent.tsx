import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Icon from "../../theme/components/icon";
import ModeToggler from "./ModeToggler";
import UserDropdown from "./UserDropdown";
import { Settings } from "src/configs/g_types/types";

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      >
        {hidden ? (
          <IconButton
            color="inherit"
            sx={{ ml: -2.75 }}
            onClick={toggleNavVisibility}
          >
            <Icon fontSize="1.5rem" icon="tabler:menu-2" />
          </IconButton>
        ) : null}

        {process.env.NODE_ENV == "development" && (
          <ModeToggler settings={settings} saveSettings={saveSettings} />
        )}
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

export default AppBarContent;
