import React, { useState } from "react";

import {
  AccountDefaultMenu,
  AccountMobileMenu,
  ToolbarMenuActions,
} from "@/components/Layout/App/Header/Menu";
import { PsMenuIconButton } from "@/components/Playstation/PSIconButtons";
import { AppBar, Box, Toolbar } from "@mui/material";

import { Title } from "./Title";

interface HeaderProps {
  toggleNavigation: () => void;
}

export const AppHeader = ({ toggleNavigation }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleAccountMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleAccountMobileMenuClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters variant="dense">
          <PsMenuIconButton toggleNavigation={toggleNavigation} />
          <Title />
          <Box sx={{ flexGrow: 1 }} />
          <ToolbarMenuActions
            handleProfileMenuOpen={handleProfileMenuOpen}
            handleAccountMobileMenuOpen={handleAccountMobileMenuOpen}
          />
        </Toolbar>
      </AppBar>
      <AccountMobileMenu
        isMenuOpen={Boolean(mobileMoreAnchorEl)}
        handleMenuOpen={handleAccountMobileMenuOpen}
        handleMenuClose={handleAccountMobileMenuClose}
        anchorEl={mobileMoreAnchorEl}
      />
      <AccountDefaultMenu
        isMenuOpen={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
      />
    </>
  );
};
