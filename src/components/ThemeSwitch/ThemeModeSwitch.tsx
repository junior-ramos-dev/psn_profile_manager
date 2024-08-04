import { useContext } from "react";

import { ThemeContext } from "@/contexts";
import { LIGHT_MODE_THEME } from "@/settings/app";
import { NightsStay } from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

import { ActionItem } from "../Layout/App/Header/Menu/Actions/ActionItem";

export const ThemeModeSwitch = ({
  disableTooltip = false,
}: {
  disableTooltip?: boolean;
}) => {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeContext);

  return (
    <ActionItem
      title="Toggle Theme"
      icon={
        theme.palette.mode === LIGHT_MODE_THEME ? LightModeIcon : NightsStay
      }
      onClick={toggleThemeMode}
      disableTooltip={disableTooltip}
    />
  );
};
