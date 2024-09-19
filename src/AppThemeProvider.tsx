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

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  selectUserThemeMode,
  selectUserThemePreset,
} from "./services/rtkQueryApi/user/userPreferencesSelectors";
import {
  actionSetUserThemeMode,
  actionSetUserThemePreset,
} from "./services/rtkQueryApi/user/userPreferencesSlice";

type AppThemeProviderProps = {
  children?: React.ReactNode;
};

export const AppThemeProvider = (props: AppThemeProviderProps) => {
  const dispatch = useAppDispatch();
  const userThemeMode = useAppSelector(selectUserThemeMode);
  const userThemePreset = useAppSelector(selectUserThemePreset);

  const [themeMode, setThemeMode] = useState<THEME_MODE>(
    userThemeMode ?? THEME_MODE.DARK
  );
  const [themePreset, setThemePreset] = useState<THEME_PRESET>(
    userThemePreset ?? THEME_PRESET.PSN
  );

  const TOTAL_PRESETS = Object.keys(THEME_PRESET).length / 2;

  const colorMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setThemeMode((prevMode) =>
          prevMode === THEME_MODE.LIGHT
            ? THEME_MODE.DARK
            : (THEME_MODE.LIGHT as THEME_MODE)
        );
      },
      changeThemeColor: () => {
        setThemePreset(
          (prevTheme) => ((prevTheme + 1) % TOTAL_PRESETS) as THEME_PRESET
        );
      },
    }),
    []
  );

  useEffect(() => {
    dispatch(actionSetUserThemeMode(themeMode));
  }, [themeMode]);
  useEffect(() => {
    dispatch(actionSetUserThemePreset(themePreset));
  }, [themePreset]);

  const _theme = useMemo(
    () => createTheme(PRESET_THEME_MAP[themePreset][themeMode] as ThemeOptions),
    [themeMode, themePreset]
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
