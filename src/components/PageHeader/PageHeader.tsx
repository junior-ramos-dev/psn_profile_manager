import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import { Hamburger } from "@/components/Header/Hamburger";
import { Search } from "@/components/Header/Search";
import { PsControllerIconButton } from "@/components/Playstation/PSIconButtons";

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
