/** @jsxImportSource @emotion/react */
import { LoginOrRegister } from "@/components/LoginOrRegister";
import { UserProfileDetailHeader } from "@/components/User/UserProfileDetailHeader";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userProfileSelectors";
import {
  AccountCircle as AccountIcon,
  List as PreferencesIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { Box, Divider, Stack } from "@mui/material";

import { ActionItemIcon } from "./ItemType/ActionItemIcon";
import { ActionItemImg } from "./ItemType/ActionItemImg";

interface IAccountActionItemsProps {
  total?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTitle?: boolean;
  disableTooltip?: boolean;
  // iconColor?: AppThemeColor;
}

export const ActionAccountUser = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: IAccountActionItemsProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const userProfile = useAppSelector(selectUserProfile);
  let imageUrl = "";

  if (isLoggedIn && userProfile)
    imageUrl = userProfile.avatarUrls[0]?.avatarUrl ?? "";

  return isLoggedIn ? (
    <Box
      sx={{
        height: "40px",
        width: "500px",
        border: "1px solid",
        borderColor: "grey.500",
        borderRadius: 5,
      }}
    >
      <Stack
        spacing={1}
        direction="row"
        justifyContent="end"
        sx={{ alignItems: "flex-end" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <UserProfileDetailHeader userProfile={userProfile} />
        <ActionItemImg
          title="Account"
          imageUrl={imageUrl}
          onClick={onClick}
          disableTooltip={disableTooltip}
          disableTitle={disableTitle}
        />
      </Stack>
    </Box>
  ) : (
    <>
      <LoginOrRegister />
      <ActionItemIcon
        title="Account"
        icon={AccountIcon}
        onClick={onClick}
        disableTooltip={disableTooltip}
        disableTitle={disableTitle}
      />
    </>
  );
};

export const ActionAccountPreferences = ({
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: IAccountActionItemsProps) => (
  <ActionItemIcon
    title="Preferences"
    icon={PreferencesIcon}
    onClick={onClick}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionAccountMessages = ({
  total,
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: IAccountActionItemsProps) => (
  <ActionItemIcon
    title="Messages"
    icon={MailIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);

export const ActionAccountNotifications = ({
  total,
  onClick,
  disableTooltip = false,
  disableTitle = false,
}: IAccountActionItemsProps) => (
  <ActionItemIcon
    title="Notifications"
    icon={NotificationsIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
    disableTitle={disableTitle}
  />
);
