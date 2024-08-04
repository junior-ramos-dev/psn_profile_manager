import React, { useContext } from "react";

import { ThemeModeSwitch } from "@/components/ThemeSwitch/ThemeModeSwitch";
import { ThemeContext } from "@/contexts";
import { Box, Menu, MenuItem } from "@mui/material";

import { Messages, Notifications, Settings,SignOut } from "./Actions";

interface MobileMenuProps {
  isMenuOpen: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
}

export const MobileMenu = ({
  isMenuOpen,
  handleMenuOpen,
  handleMenuClose,
  anchorEl,
}: MobileMenuProps) => {
  const { toggleThemeMode } = useContext(ThemeContext);

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
        <MenuItem onClick={toggleThemeMode}>
          <ThemeModeSwitch disableTooltip />
          Toggle Theme
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Messages total={15} disableTooltip />
          Messages
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Notifications total={20} disableTooltip />
          Notifications
        </MenuItem>
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
