/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

import { PageContentWrapper } from "@/components/Common/PageContentWrapper";
import { GameList } from "@/components/Game";
import { GamePageHeader } from "@/components/Game/GamePageHeader";
import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app/constants";
import { Box } from "@mui/material";

const Games = () => {
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GAMES} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <GamePageHeader pageTitle={PAGE_TITLE_GAMES} />
      </Box>
      <PageContentWrapper>
        <Suspense>
          <GameList />
        </Suspense>
      </PageContentWrapper>
    </>
  );
};

export default Games;
