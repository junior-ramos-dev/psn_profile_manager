/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { IGame } from "@/models/interfaces";
import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app";
import { Box } from "@mui/material";

interface RoutesChildrenProps {
  gameDetail: IGame;
}

export const GameDetail = ({ gameDetail }: RoutesChildrenProps) => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => setOpen((status) => !status);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GAMES} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <PageHeader toggleNavigation={toggleNavigation} />
      </Box>

      <div>
        <h2>Games Detail</h2>
        <div>{gameDetail.trophyTitleName}</div>
        <div>{JSON.stringify(gameDetail.earnedTrophies)}</div>
      </div>
    </>
  );
};
