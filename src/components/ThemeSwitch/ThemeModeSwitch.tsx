import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { NightsStay } from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ActionItem } from "../Actions/ActionItem";

import { ThemeContext } from "@/contexts";
import { LIGHT_MODE_THEME } from "@/utils/constants";

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
