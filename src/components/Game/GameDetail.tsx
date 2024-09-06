/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { IGame } from "@/models/interfaces";
import { selectGameById } from "@/services/rtkQueryApi/game/gameSelectors";
import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app/constants";
import { Box, Divider } from "@mui/material";

import { TrophyList } from "../Trophy/TrophyList";

interface RoutesChildrenProps {
  gameId: string;
}

export const GameDetail = ({ gameId }: RoutesChildrenProps) => {
  const game: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameId)
  );

  const trophyTitlePlatform = game.trophyTitlePlatform;
  const npCommunicationId = game.npCommunicationId;

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
        <Divider />

        <div>
          TrophyList
          <TrophyList
            trophyTitlePlatform={trophyTitlePlatform}
            npCommunicationId={npCommunicationId}
          />
        </div>
      </div>
    </>
  );
};
