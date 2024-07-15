import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import { Hamburger } from "../Header/Hamburger";
import { Search } from "../Header/Search";
import { PsControllerIconButton } from "../Playstation/PSIconButtons";

interface PageHeaderProps {
  toggleNavigation: () => void;
}

export const PageHeader = ({ toggleNavigation }: PageHeaderProps) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      elevation={0}
      color="secondary"
      sx={{ mt: 8.5 }}
    >
      <Toolbar disableGutters variant="dense" sx={{ ml: 10.5 }}>
        <Hamburger toggleNavigation={toggleNavigation} />
        {/* <PsControllerIconButton toggleNavigation={toggleNavigation} /> */}
        <Search />
      </Toolbar>
    </AppBar>
  );
};
