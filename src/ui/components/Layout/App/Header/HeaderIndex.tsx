/** @jsxImportSource @emotion/react */
import { useState } from "react";

import {
  AccountDefaultMenu,
  AccountMobileMenu,
} from "@/ui/components/Layout/App/Header/Menu/Account";
import { PsMenuIconButton } from "@/ui/components/Playstation/PSIconButtons";
import { AppBar, Box, Toolbar } from "@mui/material";

import { Title } from "./Title";
import { ToolbarMenuActions } from "./ToolbarMenuActions";

interface AppHeaderProps {
  toggleNavigation: () => void;
}

export const HeaderIndex = ({ toggleNavigation }: AppHeaderProps) => {
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
