/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { IGame } from "@/models/interfaces";
import { useGetGameDetailsQuery } from "@/services/rtkQueryApi/game/gameApi";
import { selectGameById } from "@/services/rtkQueryApi/game/gameSelectors";
import {
  APP_TITLE,
  IMG_TYPE,
  PAGE_TITLE_GAMES,
} from "@/settings/app/constants";
import { Box, Divider } from "@mui/material";

import { Loading } from "../Loading";
import { TrophyGroupList } from "../Trophy/TrophyGroupList";

import { GameListItemDetail } from "./GameListItemDetail";

interface RoutesChildrenProps {
  gameId: string;
}

export const GameDetail = ({ gameId }: RoutesChildrenProps) => {
  const iGame: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameId)
  );

  const trophyTitlePlatform = iGame.trophyTitlePlatform;
  const npCommunicationId = iGame.npCommunicationId;

  const { data: gameDetails, isLoading: isLoading /* isError, isSuccess   */ } =
    useGetGameDetailsQuery(
      {
        trophyTitlePlatform,
        npCommunicationId,
        imgType: IMG_TYPE.WEBP,
        getTrophies: 1, //true
      }
      // {
      //   pollingInterval: 60 * 60 * 1000 * 2, //(60 * 60 * 1000 * 2) = 2h
      //   refetchOnFocus: true,
      //   refetchOnMountOrArgChange: true,
      //   skip: false,
      // }
    );

  if (isLoading) return <Loading />;

  const game = gameDetails.usergame;
  const gameIcon = gameDetails.gameIcon;
  const trophyGroupsInfo = gameDetails.trophyGroupsInfo;

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GAMES} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <PageHeader
          pageTitle={`[${game.trophyTitlePlatform}] ${game.trophyTitleName}`}
        />
      </Box>

      <Box sx={{ mt: 12 }}>
        <GameListItemDetail game={game} gameIcon={gameIcon} />
        <Divider />
        <TrophyGroupList trophyGroupsInfo={trophyGroupsInfo} />
      </Box>
    </>
  );
};
