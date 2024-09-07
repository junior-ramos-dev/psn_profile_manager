/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { UserProfile } from "@/components/User/UserProfile";
import { useAppSelector } from "@/hooks/redux";
import useOverFlowHidden from "@/hooks/useOverFlowHidden";
import { selectUserProfile } from "@/services/rtkQueryApi/user/userSelectors";
import {
  APP_TITLE,
  FOOTER_HEIGHT,
  PAGE_TITLE_HOME,
} from "@/settings/app/constants";
import { Box } from "@mui/material";

const Home = () => {
  //Disable page scroll
  useOverFlowHidden();

  const userProfile = useAppSelector(selectUserProfile);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <PageHeader pageTitle={PAGE_TITLE_HOME} />
      </Box>

      <div
        id="container"
        style={{
          width: "100%",
          height: `calc(100% - ${FOOTER_HEIGHT + 30}px)`,
          position: "relative",
          display: "block",
          // border: "1px solid blue",
          marginTop: "85px",
          // flexShrink: 0,
          whiteSpace: "nowrap",
          // boxSizing: "border-box",
        }}
      >
        <UserProfile userProfile={userProfile} />
        <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 10 }}>
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default Home;
