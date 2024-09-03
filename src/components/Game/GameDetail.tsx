/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { PageHeader } from "@/components/DefaultPage/PageHeader";
import { Loading } from "@/components/Loading";
import { IGame } from "@/models/interfaces";
import {
  selectGameById,
  selectGamesList,
} from "@/services/rtkQueryApi/game/gameSelectors";
import { useGetTrophyListQuery } from "@/services/rtkQueryApi/trophy/trophyApi";
import { APP_TITLE, PAGE_TITLE_GAMES } from "@/settings/app/constants";
import { Box, Divider } from "@mui/material";

import { TrophyList } from "../Trophy/TrophyList";

interface RoutesChildrenProps {
  gameId: string;
}

export const GameDetail = ({ gameId }: RoutesChildrenProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gamesList = useSelector(selectGamesList);
  const game: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameId)
  );

  const trophyTitlePlatform = game.trophyTitlePlatform;
  const npCommunicationId = game.npCommunicationId;

  const { data: trophyList, isLoading /* isError, isSuccess   */ } =
    useGetTrophyListQuery(
      { trophyTitlePlatform, npCommunicationId },
      {
        pollingInterval: 60 * 60 * 1000 * 2, //(60 * 60 * 1000 * 2) = 2h
        // refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        skip: false,
      }
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
        <Divider />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            TrophyList
            {/* {trophyList.npCommunicationId}
            {trophyList.npCommunicationId}
            {trophyList.trophies[0].trophyName} */}
            <TrophyList trophyList={trophyList} />
          </div>
        )}
      </div>
    </>
  );
};
