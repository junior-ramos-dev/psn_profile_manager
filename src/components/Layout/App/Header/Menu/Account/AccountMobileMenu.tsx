/** @jsxImportSource @emotion/react */
import { useContext } from "react";

import { ActionAccountPreferences } from "@/components/Layout/App/Actions/AccountActionItems";
import {
  ActionAppChangeThemeColor,
  ActionAppSettings,
  ActionAppToggleThemeMode,
} from "@/components/Layout/App/Actions/AppActionItems";
import {
  ActionLogin,
  ActionLogout,
} from "@/components/Layout/App/Actions/AuthActionItems";
import { UserProfileIdAndName } from "@/components/User/UserProfileIdAndName";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userProfileSelectors";
import { ThemeContext } from "@/settings/app/theme/themeContext";
import { Box, Divider, Menu, MenuItem } from "@mui/material";

interface AccountMobileMenuProps {
  isMenuOpen: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
}

export const AccountMobileMenu = ({
  isMenuOpen,
  // handleMenuOpen,
  handleMenuClose,
  anchorEl,
}: AccountMobileMenuProps) => {
  const { toggleThemeMode, changeThemeColor } = useContext(ThemeContext);

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
          <Box>
            <MenuItem onClick={handleMenuClose}>
              <UserProfileIdAndName
                onlineId={userProfile.onlineId}
                firstName={userProfile.personalDetail.firstName}
                lastName={userProfile.personalDetail.lastName}
              />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleMenuClose}
              sx={{ mt: 2, mb: 3, height: 5 }}
            >
              <ActionAppSettings disableTooltip />
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ mt: 2, mb: 3, height: 5 }}
            >
              <ActionAccountPreferences disableTooltip />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={toggleThemeMode}
              sx={{ mt: 2, mb: 3, height: 5 }}
            >
              <ActionAppToggleThemeMode disableTooltip />
            </MenuItem>
            <MenuItem
              onClick={changeThemeColor}
              sx={{ mt: 2, mb: 3, height: 5 }}
            >
              <ActionAppChangeThemeColor />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleMenuClose}
              sx={{ mt: 2, mb: 2, height: 5 }}
            >
              <ActionLogout
                handleMenuClose={handleMenuClose}
                disableTooltip
                iconColor="warning"
              />
            </MenuItem>
          </Box>
        ) : (
          <>
            <MenuItem sx={{ mt: 2, mb: 3, height: 5 }}>
              <ActionAppToggleThemeMode disableTooltip />
            </MenuItem>
            <MenuItem sx={{ mt: 2, mb: 3, height: 5 }}>
              <ActionAppChangeThemeColor />
            </MenuItem>
            <Divider />
            <MenuItem sx={{ mt: 2, mb: 2, height: 5 }}>
              <ActionLogin
                handleMenuClose={handleMenuClose}
                disableTooltip
                iconColor="success"
              />
            </MenuItem>
          </>
        )}
      </Box>
    </Menu>
  );
};
