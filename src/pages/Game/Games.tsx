/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";

import {
  APP_TITLE,
  PAGE_TITLE_HOME,
  DRAWER_WIDTH,
  FOOTER_HEIGHT,
} from "@/utils/constants";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { getUser } from "@/slices/authSlice";

import { PageHeader } from "@/components/PageHeader";
import { GamesRoutes } from "@/components/Navigation/GameRoutes/GamesRoutes";

export const Games = () => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  const dispatch = useAppDispatch();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo]);

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
        <GamesRoutes />
      </div>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 10 }}>
        <Outlet />
      </Box> */}
    </>
  );
};
