import { UserProfileIdAndName } from "@/components/User/UserProfileIdAndName";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userSelectors";
import { Divider, Menu, MenuItem } from "@mui/material";

import { LogIn, LogOut, Preferences, Settings } from "./Actions";

interface AccountDefaultMenuProps {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
}

export const AccountDefaultMenu = ({
  isMenuOpen,
  handleMenuClose,
  anchorEl,
}: AccountDefaultMenuProps) => {
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
      <MenuItem onClick={handleMenuClose} sx={{ mt: 2, mb: 3, height: 5 }}>
        <Settings disableTooltip />
      </MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ mt: 2, mb: 3, height: 5 }}>
        <Preferences disableTooltip />
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose} sx={{ mt: 2, mb: 3, height: 5 }}>
        <LogIn disableTooltip />
      </MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ mt: 2, mb: 3, height: 5 }}>
        <LogOut disableTooltip />
      </MenuItem>
    </Menu>
  );
};
