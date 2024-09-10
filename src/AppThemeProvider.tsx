import { useEffect, useMemo, useState } from "react";

import {
  PRESET_THEME_MAP,
  THEME_MODE,
  THEME_PRESET,
} from "@/settings/app/theme/appTheme";
import { ThemeContext } from "@/settings/app/theme/themeContext";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type AppThemeProviderProps = {
  children?: React.ReactNode;
};

export const AppThemeProvider = (props: AppThemeProviderProps) => {
  const TOTAL_PRESETS = Object.keys(THEME_PRESET).length / 2;

  const prefersDarkMode = useMediaQuery(
    `(prefers-color-scheme: ${THEME_MODE.DARK})`
  );

  const [mode, setMode] = useState<THEME_MODE>(
    prefersDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT
  );

  const [theme, setTheme] = useState<THEME_PRESET>(THEME_PRESET.PSN);

  useEffect(() => {
    setMode(prefersDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT);
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT
        );
      },
      changeThemeColor: () => {
        setTheme(
          (prevTheme) => ((prevTheme + 1) % TOTAL_PRESETS) as THEME_PRESET
        );
      },
    }),
    []
  );

  const _theme = useMemo(
    () => createTheme(PRESET_THEME_MAP[theme][mode] as ThemeOptions),
    [mode, theme]
  );

  // CssBaseline use: [https://stackoverflow.com/a/59145819/17449710](https://stackoverflow.com/a/59145819/17449710)
  // GlobalStyles use:  [https://stackoverflow.com/a/69905540/17449710](https://stackoverflow.com/a/69905540/17449710)

  // Sure we will use our theme to provide colours to buttons and various components but we can’t change our App’s background and font color dynamically (technically that can be done but this is the MUI way).
  // CssBaseline provides this functionality to manage background and text color of our app automatically based on what theme we provide it. (ex body html tag)

  // GlobalStyles just retains the page’s default css that gets reset/removed by CssBaseline. (ex body has a margin of 8px by default .. or something)
  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={_theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
