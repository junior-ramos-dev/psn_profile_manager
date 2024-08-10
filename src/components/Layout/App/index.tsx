/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "@/components/Layout/App/Footer";
import { IRouteItem } from "@/models/interfaces";
import { FOOTER_HEIGHT } from "@/settings/app/constants";
import { css } from "@emotion/react";
import { Box } from "@mui/material";

import { AppHeader } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <>
      <div
        css={css`
          min-height: 100vh;
        `}
      >
        <div
          css={css`
            display: flex;
            min-height: calc(100vh - ${FOOTER_HEIGHT - 9}px);
          `}
        >
          <Box component="header">
            <AppHeader toggleNavigation={toggleNavigation} />
          </Box>
          <Sidebar open={open} handleClose={toggleNavigation} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 1,
              pt: 5,
              zIndex: (theme) => theme.zIndex.drawer - 2,
            }}
          >
            <Outlet />
          </Box>
        </div>
      </div>
      <Box component="footer">
        <Footer />
      </Box>
    </>
  );
};
