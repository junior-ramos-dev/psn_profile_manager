/** @jsxImportSource @emotion/react */
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userProfileSelectors";
import { ActionAccountPreferences } from "@/ui/components/Layout/App/Actions/AccountActionItems";
import {
  ActionAppChangeThemeColor,
  ActionAppSettings,
  ActionAppToggleThemeMode,
} from "@/ui/components/Layout/App/Actions/AppActionItems";
import { ActionLogout } from "@/ui/components/Layout/App/Actions/AuthActionItems";
import { UserProfileIdAndName } from "@/ui/components/User/UserProfileIdAndName";
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
              <ActionAppSettings
                disableTooltip
                handleMenuClose={handleMenuClose}
              />
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ mt: 2, mb: 3, height: 5 }}
            >
              <ActionAccountPreferences disableTooltip />
            </MenuItem>
            <Divider />
            <MenuItem sx={{ mt: 2, mb: 3, height: 5 }}>
              <ActionAppToggleThemeMode disableTooltip />
            </MenuItem>
            <MenuItem sx={{ mt: 2, mb: 3, height: 5 }}>
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
          <Box>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ mt: 2, mb: 3, height: 5 }}
            >
              <ActionAppSettings
                disableTooltip
                handleMenuClose={handleMenuClose}
              />
            </MenuItem>
            <Divider />
            <MenuItem sx={{ mt: 2, mb: 3, height: 5 }}>
              <ActionAppToggleThemeMode disableTooltip />
            </MenuItem>
            <MenuItem sx={{ mt: 2, mb: 3, height: 5 }}>
              <ActionAppChangeThemeColor />
            </MenuItem>
            <Divider />
          </Box>
        )}
      </Box>
    </Menu>
  );
};
