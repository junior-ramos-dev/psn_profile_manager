import { useContext } from "react";

import { UserProfileIdAndName } from "@/components/User/UserProfileIdAndName";
import { ThemeContext } from "@/contexts";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userSelectors";
import { Box, Divider, Menu, MenuItem } from "@mui/material";

import {
  LogIn,
  LogOut,
  Preferences,
  Settings,
  ThemeColorShuffle,
  ThemeModeSwitch,
} from "./Actions";

interface AccountMobileMenuProps {
  isMenuOpen: boolean;
  // handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
}

export const AccountMobileMenu = ({
  isMenuOpen,
  // handleMenuOpen,
  handleMenuClose,
  anchorEl,
}: AccountMobileMenuProps) => {
  const { toggleThemeMode, shuffleThemeColor } = useContext(ThemeContext);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const userProfile = useAppSelector(selectUserProfile);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ textAlign: "center" }}>
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
        <MenuItem onClick={toggleThemeMode} sx={{ mt: 2, mb: 3, height: 5 }}>
          <ThemeModeSwitch disableTooltip />
        </MenuItem>
        <MenuItem onClick={shuffleThemeColor} sx={{ mt: 2, mb: 3, height: 5 }}>
          <ThemeColorShuffle />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ mt: 2, mb: 3, height: 5 }}>
          <LogIn disableTooltip />
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ mt: 2, mb: 3, height: 5 }}>
          <LogOut disableTooltip onClick={() => alert("Signing out...")} />
        </MenuItem>
      </Box>
    </Menu>
  );
};
