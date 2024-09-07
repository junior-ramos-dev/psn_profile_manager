/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Footer } from "@/components/Layout/App/Footer";
import { setAxiosInterceptorResponse } from "@/services/axios/axiosApiConfig";
import { FOOTER_HEIGHT } from "@/settings/app/constants";
import { Box, styled } from "@mui/material";

import { HeaderIndex } from "./Header/HeaderIndex";
import { SidebarIndex } from "./Sidebar/SidebarIndex";

const LayoutWrapper = styled("div")(() => ({
  minHeight: "100vh",
}));

const LayoutChildrenWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: `calc(100vh - ${FOOTER_HEIGHT - 9}px)`,
}));

export const LayoutIndex = () => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  const navigate = useNavigate();
  useEffect(() => {
    setAxiosInterceptorResponse(navigate);
  }, []);

  return (
    <>
      <LayoutWrapper>
        <LayoutChildrenWrapper>
          <Box component="header">
            <HeaderIndex toggleNavigation={toggleNavigation} />
          </Box>
          <SidebarIndex open={open} handleClose={toggleNavigation} />
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
        </LayoutChildrenWrapper>
      </LayoutWrapper>
      <Box component="footer">
        <Footer />
      </Box>
    </>
  );
};
