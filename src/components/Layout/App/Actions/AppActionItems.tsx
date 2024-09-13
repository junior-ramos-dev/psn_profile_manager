/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { THEME_MODE } from "@/settings/app/theme/appTheme";
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
  handleMenuClose?: () => void;
  disableTitle?: boolean;
  disableTooltip?: boolean;
  // iconColor?: AppThemeColor;
}

export const ActionAppSettings = ({
  handleMenuClose,
  disableTooltip = false,
  disableTitle = false,
  // iconColor,
}: IAppActionItemsProps) => {
  const navigate = useNavigate();

  const handleActionSettings = async () => {
    try {
      navigate("/settings");
      if (handleMenuClose) handleMenuClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ActionItemIcon
      title="Settings"
      icon={SettingsIcon}
      onClick={handleActionSettings}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

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
        theme.palette.mode === THEME_MODE.LIGHT ? LightModeIcon : NightsStay
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
  const { changeThemeColor } = useContext(ThemeContext);

  return (
    <ActionItemIcon
      title="Change Theme Color"
      icon={ColorLensIcon}
      onClick={changeThemeColor}
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
