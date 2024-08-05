/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { useAppSelector } from "@/hooks/redux";
import useOverFlowHidden from "@/hooks/useOverFlowHidden";
import { authSelectors } from "@/services/rtkQueryApi/auth";
import { APP_TITLE, FOOTER_HEIGHT, PAGE_TITLE_HOME } from "@/settings/app";
import { Box } from "@mui/material";

const Home = () => {
  //Disable page scroll
  useOverFlowHidden();

  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  const userBasicInfo = useAppSelector(authSelectors.getAuthUser);

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
        <h2>{userBasicInfo}</h2>
        <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 10 }}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Home;
