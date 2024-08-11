/** @jsxImportSource @emotion/react */
import { stringify } from "json-stable-stringify";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { IGame } from "@/models/interfaces";
import {
  selectGameById,
  selectGamesList,
} from "@/services/rtkQueryApi/games/gamesSelectors";
import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app/constants";
import { Box } from "@mui/material";

interface RoutesChildrenProps {
  gameId: string;
}

export const GameDetail = ({ gameId }: RoutesChildrenProps) => {
  const gamesList = useSelector(selectGamesList);
  const game: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameId)
  );

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
        <div>{JSON.stringify(game)}</div>
      </div>
    </>
  );
};
