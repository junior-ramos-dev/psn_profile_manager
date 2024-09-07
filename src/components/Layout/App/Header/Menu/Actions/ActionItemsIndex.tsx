import { useContext } from "react";

import { ThemeContext } from "@/contexts";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userSelectors";
import { LIGHT_MODE_THEME } from "@/settings/app/constants";
import {
  Fingerprint as FingerprintIcon,
  List as PreferencesIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  NightsStay,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

import { ActionItemIcon } from "./ActionItemIcon";
import { ActionItemImg } from "./ActionItemImg";

interface ActionIndexProps {
  total?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTitle?: boolean;
  disableTooltip?: boolean;
}

export const ActionUserAccount = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const userProfile = useAppSelector(selectUserProfile);

  const imageUrl = userProfile.avatarUrls[0].avatarUrl;

  return isLoggedIn ? (
    <ActionItemImg
      title="Account"
      imageUrl={imageUrl}
      onClick={onClick}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  ) : (
    <ActionItemIcon
      title="Account"
      icon={FingerprintIcon}
      onClick={onClick}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

export const ActionPreferences = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="Preferences"
    icon={PreferencesIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionSettings = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="Settings"
    icon={SettingsIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionLogin = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="Login"
    icon={LoginIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionLogout = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="Logout"
    icon={LogoutIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionMessages = ({
  total,
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="Messages"
    icon={MailIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionNotifications = ({
  total,
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="Notifications"
    icon={NotificationsIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionToggleThemeMode = ({
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

export const ActionChangeThemeColor = ({
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

export const ActionMore = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionIndexProps) => (
  <ActionItemIcon
    title="ActionMore"
    icon={MoreIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);
