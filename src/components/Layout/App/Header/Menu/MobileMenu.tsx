import { useContext } from "react";

import { ThemeColorShuffle } from "@/components/ThemeSwitch";
import { ThemeModeSwitch } from "@/components/ThemeSwitch/ThemeModeSwitch";
import { UserProfileIdAndName } from "@/components/User/UserProfileIdAndName";
import { ThemeContext } from "@/contexts";
import { useAppSelector } from "@/hooks/redux";
import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userSelectors";
import { Box, Divider, Menu, MenuItem } from "@mui/material";

import { Settings, SignOut } from "./Actions";

interface MobileMenuProps {
  isMenuOpen: boolean;
  // handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
}

export const MobileMenu = ({
  isMenuOpen,
  // handleMenuOpen,
  handleMenuClose,
  anchorEl,
}: MobileMenuProps) => {
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
        <MenuItem onClick={toggleThemeMode}>
          <ThemeModeSwitch disableTooltip />
          Toggle Theme
        </MenuItem>
        <MenuItem onClick={shuffleThemeColor}>
          <ThemeColorShuffle />
          Color Shuffle
        </MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>
          <Messages total={0} disableTooltip />
          Messages
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Notifications total={0} disableTooltip />
          Notifications
        </MenuItem> */}
        <MenuItem onClick={handleMenuClose}>
          <Settings disableTooltip />
          Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <SignOut disableTooltip onClick={() => alert("Signing out...")} />
          Sign Out
        </MenuItem>
      </Box>
    </Menu>
  );
};
