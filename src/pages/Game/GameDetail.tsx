/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Helmet } from "react-helmet-async";

import {
  APP_TITLE,
  PAGE_TITLE_GAMES,
  PAGE_TITLE_HOME,
} from "@/utils/constants";
import { Outlet } from "react-router-dom";

import { useLoaderData, LoaderFunction } from "react-router-dom";

import { Game } from "@/models/classes/Game";

import { getGame } from "@/data/fakeApi";
import { Box } from "@mui/material";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";

// Define the structure for expected loader data
interface LoaderData {
  game: Game;
}

// Type-safe loader function
export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const game: Game = await getGame(params.npCommunicationId);
  return { game };
};

//TODO Use redux store
export const GameDetail = () => {
  const { game } = useLoaderData<LoaderData>() as Game;

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
        <div>{game.trophyTitleName}</div>
        <div>{JSON.stringify(game.earnedTrophies)}</div>
      </div>
    </>
  );
};
