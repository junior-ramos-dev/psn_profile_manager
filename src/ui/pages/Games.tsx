/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app/constants";
import { PageContentWrapper } from "@/ui/components/Common/PageContentWrapper";
import { GameList } from "@/ui/components/Game";
import { GamePageHeader } from "@/ui/components/Game/GamePageHeader";
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
