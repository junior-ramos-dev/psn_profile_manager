/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { IGame } from "@/models/interfaces";
import { useGetGameIconBinByImgTypeQuery } from "@/services/rtkQueryApi/game/gameApi";
import { selectGameById } from "@/services/rtkQueryApi/game/gameSelectors";
import {
  APP_TITLE,
  IMG_TYPE,
  PAGE_TITLE_GAMES,
} from "@/settings/app/constants";
import { Box, Divider } from "@mui/material";

import { Loading } from "../Loading";
import { TrophyList } from "../Trophy/TrophyList";

import { GameListItemDetail } from "./GameListItemDetail";

interface RoutesChildrenProps {
  gameId: string;
}

export const GameDetail = ({ gameId }: RoutesChildrenProps) => {
  const game: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameId)
  );

  const trophyTitlePlatform = game.trophyTitlePlatform;
  const npCommunicationId = game.npCommunicationId;

  const { data: gameIcon, isLoading /* isError, isSuccess   */ } =
    useGetGameIconBinByImgTypeQuery(
      { npCommunicationId, imgType: IMG_TYPE.WEBP }
      // {
      //   pollingInterval: 60 * 60 * 1000 * 2, //(60 * 60 * 1000 * 2) = 2h
      //   // refetchOnFocus: true,
      //   refetchOnMountOrArgChange: true,
      //   skip: false,
      // }
    );

  if (isLoading) return <Loading />;

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
        <TrophyList
          trophyTitlePlatform={trophyTitlePlatform}
          npCommunicationId={npCommunicationId}
        />
      </Box>
    </>
  );
};
