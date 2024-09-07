import { UserProfileIdAndName } from "@/components/User/UserProfileIdAndName";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userSelectors";
import { Divider, Menu, MenuItem } from "@mui/material";

import { Preferences, Settings, SignOut } from "./Actions";

interface DefaultMenuProps {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
}

export const DefaultMenu = ({
  isMenuOpen,
  handleMenuClose,
  anchorEl,
}: DefaultMenuProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const userProfile = useAppSelector(selectUserProfile);

  return (
    <Menu
      anchorEl={anchorEl}
      id="primary-search-account-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItem onClick={handleMenuClose}>
            <UserProfileIdAndName
              onlineId={userProfile.onlineId}
              firstName={userProfile.personalDetail.firstName}
              lastName={userProfile.personalDetail.lastName}
            />
          </MenuItem>
          <Divider />
        </>
      ) : (
        <></>
      )}
      <MenuItem onClick={handleMenuClose}>
        <Settings disableTooltip />
        Settings
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Preferences disableTooltip />
        Preferences
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <SignOut disableTooltip />
        Sign Out
      </MenuItem>
    </Menu>
  );
};
