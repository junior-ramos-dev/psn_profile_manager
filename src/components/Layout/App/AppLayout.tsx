/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { AppHeader } from "./AppHeader";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { IRouteItem } from "@/models/interfaces";
import { FOOTER_HEIGHT } from "@/settings/app";

interface LayoutProps {
  routes: Array<IRouteItem>;
}

export const AppLayout = ({ routes }: LayoutProps) => {
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
          <Navigation
            routes={routes}
            open={open}
            handleClose={toggleNavigation}
          />
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
