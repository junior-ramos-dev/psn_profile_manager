/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";

import { APP_TITLE, PAGE_TITLE_HOME, FOOTER_HEIGHT } from "@/utils/constants";

import { PageHeader } from "@/components/PageHeader";
import { GamesRoutes } from "@/components/Navigation/GameRoutes/GamesRoutes";
import { authSelectors } from "@/redux/auth";
import { useSelector } from "react-redux";

export const Games = () => {
  //TODO Edit Games Page to remove hamburger
  const toggleNavigation = () => {};

  const user = useSelector(authSelectors.getUser);

  //TODO Create user profile endpoint
  // useEffect(() => {
  //   if (user) {
  //     getUserProfile(user.id);
  //   }
  // }, [user]);

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
