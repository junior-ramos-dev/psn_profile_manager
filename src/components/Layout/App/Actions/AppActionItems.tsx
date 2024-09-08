/** @jsxImportSource @emotion/react */
import { useContext } from "react";

import { LIGHT_MODE_THEME } from "@/settings/app/constants";
import { ThemeContext } from "@/settings/app/theme/themeContext";
import {
  MoreVert as MoreIcon,
  NightsStay,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

import { ActionItemIcon } from "./ItemType/ActionItemIcon";

interface IAppActionItemsProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTitle?: boolean;
  disableTooltip?: boolean;
  // iconColor?: AppThemeColor;
}

export const ActionAppSettings = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
  // iconColor,
}: IAppActionItemsProps) => (
  <ActionItemIcon
    title="Settings"
    icon={SettingsIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionAppToggleThemeMode = ({
  disableTooltip = false,
  disableTitle = false,
}: {
  disableTooltip?: boolean;
  disableTitle?: boolean;
}) => {
  const theme = useTheme();
  const { toggleThemeMode } = useContext(ThemeContext);

  return (
    <ActionItemIcon
      title="Toggle Theme Mode"
      icon={
        theme.palette.mode === LIGHT_MODE_THEME ? LightModeIcon : NightsStay
      }
      onClick={toggleThemeMode}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

export const ActionAppChangeThemeColor = ({
  disableTooltip = false,
  disableTitle = false,
}: {
  disableTooltip?: boolean;
  disableTitle?: boolean;
}) => {
  const colorMode = useContext(ThemeContext);
  return (
    <ActionItemIcon
      title="Change Theme Color"
      icon={ColorLensIcon}
      onClick={colorMode.shuffleThemeColor}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

export const ActionAppMore = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: IAppActionItemsProps) => (
  <ActionItemIcon
    title="More"
    icon={MoreIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);
