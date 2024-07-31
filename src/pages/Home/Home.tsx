/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import {
  APP_TITLE,
  PAGE_TITLE_HOME,
  DRAWER_WIDTH,
  FOOTER_HEIGHT,
} from "@/settings/app";

import { PageHeader } from "@/components/PageHeader";
import { CustomDrawer } from "@/components/CustomDrawer";

import { GamesRoutes } from "@/components/Navigation/GameRoutes/GamesRoutes";

import useOverFlowHidden from "@/hooks/useOverFlowHidden";
import { authSelectors } from "@/services/rtkQueryApi/auth";
import { useSelector } from "react-redux";

const Home = () => {
  //Disable page scroll
  useOverFlowHidden();

  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  const userBasicInfo = useSelector(authSelectors.getUserBasicInfo);

  //TODO Create user profile endpoint
  // useEffect(() => {
  //   if (userBasicInfo) {
  //     getUserProfile(user.id);
  //   }
  // }, [userBasicInfo]);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <PageHeader toggleNavigation={toggleNavigation} />
      </Box>

      <div
        id="container"
        style={{
          width: "100%",
          height: `calc(100% - ${FOOTER_HEIGHT + 30}px)`,
          position: "relative",
          display: "block",
          border: "1px solid blue",
          marginTop: "85px",
          // flexShrink: 0,
          whiteSpace: "nowrap",
          // boxSizing: "border-box",
        }}
      >
        <CustomDrawer
          open={open}
          toggleNavigation={toggleNavigation}
          openedWidth={DRAWER_WIDTH}
          closedWidth={70}
          children={<GamesRoutes />}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 10 }}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Home;
