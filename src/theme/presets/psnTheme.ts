import { AppTheme } from "@/theme/AppTheme";
import { createTheme } from "@mui/material/styles";

export const theme: AppTheme = {
  dark: {
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
      error: {
        main: "#d50000",
      },
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
  light: {
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
      error: {
        main: "#d50000",
      },
      warning: {
        main: "#ff9800",
      },
      divider: "#f5c30a",
      background: {
        default: "#181818",
        paper: "#363636",
      },
    },
  },
};
