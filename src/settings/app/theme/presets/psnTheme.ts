import { AppTheme } from "@/settings/app/theme/appTheme";
import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

export const theme: AppTheme = {
  dark: {
    palette: {
      mode: "dark",
      primary: {
        main: "#0070D1",
      },
      secondary: {
        main: "#00928d",
      },
      success: {
        main: "#41bd46",
      },
      info: palette.augmentColor({
        color: {
          main: "#99cbff",
          contrastText: "#003257",
        },
      }),
      error: palette.augmentColor({
        color: {
          main: "#F2B8B5",
          contrastText: "#601410",
        },
      }),
      warning: {
        main: "#ff9800",
      },
      divider: "#938f99",
      background: {
        default: "#181818",
        paper: "#363636",
      },
      containerPrimary: palette.augmentColor({
        color: {
          main: "#013868",
          contrastText: "#ffffff",
        },
      }),
    },
  },
  light: {
    palette: {
      mode: "light",
      primary: {
        main: "#0070D1",
      },
      secondary: {
        main: "#00928d",
      },
      success: {
        main: "#41bd46",
      },
      info: palette.augmentColor({
        color: {
          main: "#0062a2",
          contrastText: "#ffffff",
        },
      }),
      error: palette.augmentColor({
        color: {
          main: "#B3261E",
          contrastText: "#FFFFFF",
        },
      }),
      warning: {
        main: "#ff9800",
      },
      divider: "#f5c30a",
      background: {
        paper: "#d2d2d2",
        default: "#c3c3c3",
      },
    },
  },
};
