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

interface ActionProps {
  total?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTitle?: boolean;
  disableTooltip?: boolean;
}

export const UserAccount = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const userProfile = useAppSelector(selectUserProfile);

  const imageUrl = userProfile.avatarUrls[0].avatarUrl;

  return isLoggedIn ? (
    <ActionItemImg
      title="My Account"
      imageUrl={imageUrl}
      onClick={onClick}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  ) : (
    <ActionItemIcon
      title="My Account"
      icon={FingerprintIcon}
      onClick={onClick}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

export const Preferences = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="Preferences"
    icon={PreferencesIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const Settings = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="Settings"
    icon={SettingsIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const LogIn = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="Login"
    icon={LoginIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const LogOut = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="Logout"
    icon={LogoutIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const Messages = ({
  total,
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="My Messages"
    icon={MailIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const More = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="More"
    icon={MoreIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const Notifications = ({
  total,
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: ActionProps) => (
  <ActionItemIcon
    title="Notifications"
    icon={NotificationsIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ThemeModeSwitch = ({
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
      title="Toggle Theme"
      icon={
        theme.palette.mode === LIGHT_MODE_THEME ? LightModeIcon : NightsStay
      }
      onClick={toggleThemeMode}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

export const ThemeColorShuffle = ({
  disableTooltip = false,
  disableTitle = false,
}: {
  disableTooltip?: boolean;
  disableTitle?: boolean;
}) => {
  const colorMode = useContext(ThemeContext);
  return (
    <ActionItemIcon
      title="Shuffle Theme"
      icon={ColorLensIcon}
      onClick={colorMode.shuffleThemeColor}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};
