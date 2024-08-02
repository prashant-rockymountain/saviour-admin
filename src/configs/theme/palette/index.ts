// ** Type Imports
import { PaletteMode } from "@mui/material";
import { Skin } from "src/configs/g_types/types";

export const textcolor = {
  primary_text: "#DA2627",
  secondary_text: "#33303cde",
  rgba_light: "51, 48, 60",
  rgba_dark: "228, 230, 244",
};

const DefaultPalette = (mode: PaletteMode, skin: Skin) => {
  const lightModeObject = {
    text_primary: "#33303cde",
    text_secondary: "#33303c99",
    text_error: "#DA2627",
    text_disabled: "#33303c99",
    divider: "#33303c1f",
    action_active: "#33303c8a",
    action_hover: "#33303c0a",
    action_selected: "#33303c14",
    action_disabled: "#33303c42",
    action_disabled_background: "#33303c1f",
    action_focus: "#33303c1f",
  };
  const darkModeObject = {
    text_primary: "#e4e6f4de",
    text_secondary: "#e4e6f499",
    text_disabled: "#e4e6f461",
    text_error: "#DA2627",
    divider: "#e4e6f41f",
    action_active: "#e4e6f48a",
    action_hover: "#e4e6f40a",
    action_selected: "#e4e6f414",
    action_disabled: "#e4e6f442",
    action_disabled_background: "#e4e6f41f",
    action_focus: "#e4e6f41f",
  };

  const whiteColor = "#FFF";
  const lightColor = "#33303c";
  const darkColor = "rgb(228, 230, 244)";
  const darkPaperBgColor = "#2F3349";
  const mainColor = mode === "light" ? lightColor : darkColor;
  const mainColorObj = mode === "light" ? lightModeObject : darkModeObject;

  const defaultBgColor = () => {
    if (skin === "bordered" && mode === "light") {
      return whiteColor;
    } else if (skin === "bordered" && mode === "dark") {
      return darkPaperBgColor;
    } else if (mode === "light") {
      return "#F8F7FA";
    } else return "#25293C";
  };

  return {
    customColors: {
      dark: darkColor,
      // main: mainColor,
      // main: mainColorObj,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === "light" ? "#F8F7FA" : "#25293C", // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === "light" ? "#F1F0F2" : "#3B405B",
      avatarBg: mode === "light" ? "#F6F6F7" : "#4A5072",
      tableHeaderBg: mode === "light" ? "#F6F6F7" : "#4A5072",
    },
    mode: mode,
    common: {
      black: "#000",
      white: whiteColor,
    },
    primary: {
      light: "#F25E5F",
      main: "#DA2627",
      dark: "#b81111", // hover color on button
      contrastText: whiteColor,
    },
    secondary: {
      light: "#7a808c",
      main: "#0D1128", //"#0D1128"
      dark: "#2c313b",
      contrastText: whiteColor,
    },
    error: {
      light: "#ED6F70",
      main: "#EA5455",
      dark: "#CE4A4B",
      contrastText: whiteColor,
    },
    warning: {
      light: "#FFAB5A",
      main: "#FF9F43",
      dark: "#E08C3B",
      contrastText: whiteColor,
    },
    info: {
      light: "#1FD5EB",
      main: "#00CFE8",
      dark: "#00B6CC",
      contrastText: whiteColor,
    },
    success: {
      light: "#42CE80",
      main: "#28C76F",
      dark: "#23AF62",
      contrastText: whiteColor,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },
    text: {
      primary: mainColorObj.text_primary,
      secondary: mainColorObj.text_secondary,
      disabled: mainColorObj.text_disabled,
    },
    divider: mainColorObj.divider,
    background: {
      paper: mode === "light" ? whiteColor : darkPaperBgColor,
      default: defaultBgColor(),
    },
    action: {
      active: mainColorObj.action_active,
      hover: mainColorObj.action_hover,
      selected: mainColorObj.action_selected,
      disabled: mainColorObj.action_disabled,
      disabledBackground: mainColorObj.action_disabled_background,
      focus: mainColorObj.action_focus,
    },
  };
};

export default DefaultPalette;
