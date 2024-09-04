import React, { useState } from "react";

import { DefaultMenu, MobileMenu } from "@/components/Layout/App/Header/Menu";
import { More, UserAccount } from "@/components/Layout/App/Header/Menu/Actions";
import { PsMenuIconButton } from "@/components/Playstation/PSIconButtons";
import { ThemeColorShuffle } from "@/components/ThemeSwitch/ThemeColorShuffle";
import { ThemeModeSwitch } from "@/components/ThemeSwitch/ThemeModeSwitch";
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
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
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
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            <ThemeModeSwitch />
            <ThemeColorShuffle />
            {/* <Messages total={0} /> */}
            {/* <Notifications total={0} /> */}
            <UserAccount onClick={handleProfileMenuOpen} />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <More onClick={handleMobileMenuOpen} />
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        isMenuOpen={Boolean(mobileMoreAnchorEl)}
        handleMenuOpen={handleMobileMenuOpen}
        handleMenuClose={handleMobileMenuClose}
        anchorEl={mobileMoreAnchorEl}
      />
      <DefaultMenu
        isMenuOpen={Boolean(anchorEl)}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
      />
    </>
  );
};
