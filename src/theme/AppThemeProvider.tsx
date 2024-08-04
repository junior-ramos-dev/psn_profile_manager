import React, { useEffect, useMemo,useState } from "react";

import { ThemeContext } from "@/contexts/ThemeContext";
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from "@/settings/app";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeOptions,ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { THEME_PRESETS } from "./AppTheme";

type AppThemeProviderProps = {
  children?: React.ReactNode;
};

export const AppThemeProvider = (props: AppThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<
    typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME
  >(prefersDarkMode ? DARK_MODE_THEME : LIGHT_MODE_THEME);
  const [theme, setTheme] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    setMode(prefersDarkMode ? DARK_MODE_THEME : LIGHT_MODE_THEME);
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) =>
          prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME
        );
      },
      shuffleThemeColor: () => {
        setTheme((prevTheme) => ((prevTheme + 1) % 4) as 0 | 1 | 2 | 3);
      },
    }),
    []
  );

  const _theme = useMemo(
    () => createTheme(THEME_PRESETS[theme][mode] as ThemeOptions),
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
