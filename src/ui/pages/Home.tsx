/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";

import { useGetGameDetailsListQuery } from "@/services/rtkQueryApi/game/gameApi";
import { APP_TITLE, IMG_TYPE, PAGE_TITLE_HOME } from "@/settings/app/constants";
import { PageHeader } from "@/ui/components/DefaultPage/PageHeader";
import { Box, Typography } from "@mui/material";

import { PageContentWrapper } from "../components/Common/PageContentWrapper";
import { GameCardsList } from "../components/Game/GameCardsList";

const Home = () => {
  //Disable page scroll
  // useOverFlowHidden();

  const limit = 18;
  const offset = 0;

  const { data, isLoading /* isError, isSuccess   */ } =
    useGetGameDetailsListQuery(
      {
        limit: limit,
        offset: offset,
        imgType: IMG_TYPE.WEBP,
        getTrophies: 0, //false
      },
      {
        // pollingInterval: 60 * 60 * 1000 * 2, //(60 * 60 * 1000 * 2) = 2h
        // refetchOnFocus: true,
        // refetchOnMountOrArgChange: true,
        // skip: false,
      }
    );

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

      <PageContentWrapper>
        <Box sx={{ width: "80%" }}>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Recent Activity
          </Typography>
        </Box>

        <Box sx={{ overflow: "hidden" }}>
          <GameCardsList data={data} totalItems={limit} isLoading={isLoading} />
        </Box>

        {/* <Box component="main" sx={{ flexGrow: 1, p: 1, pt: 10 }}>
          <Outlet />
        </Box> */}
      </PageContentWrapper>
    </>
  );
};

export default Home;
