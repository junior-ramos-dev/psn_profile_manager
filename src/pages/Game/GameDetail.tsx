/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Helmet } from "react-helmet-async";

import {
  APP_TITLE,
  PAGE_TITLE_GAMES,
  PAGE_TITLE_HOME,
} from "@/utils/constants";
import { IGame } from "@/models/interfaces";
import { Box } from "@mui/material";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";

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
          {PAGE_TITLE_HOME} | {APP_TITLE}
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
