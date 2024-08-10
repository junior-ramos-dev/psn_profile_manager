/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app";
import { Box } from "@mui/material";

interface RoutesChildrenProps {
  gameId: string;
}

export const GameDetail = ({ gameId }: RoutesChildrenProps) => {
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GAMES} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <PageHeader pageTitle={PAGE_TITLE_GAMES} />
      </Box>

      <div>
        <h2>Games Detail</h2>
        <div>{gameId}</div>
      </div>
    </>
  );
};
