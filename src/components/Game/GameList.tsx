import { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

import { Loading } from "@/components/Loading";
import { IGameRoute } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import { useGetGamesIconBinListMutation } from "@/services/rtkQueryApi/game/gameApi";
import { selectGamesRoutes } from "@/services/rtkQueryApi/game/gameSelectors";
import { IMG_TYPE } from "@/settings/app/constants";
import { Divider, List } from "@mui/material";

import { GameListItem } from "./GameListItem";

interface IGameRouteWithIcon extends IGameRoute {
  gameIcon: IGameIcon;
}

export const GameList = () => {
  const gamesRoutes = useSelector(selectGamesRoutes);
  const [gameRouteWithIconList, setGameRouteWithIconList] = useState([]);

  const [getGamesIconBinList, { isLoading /* isError, isSuccess  data */ }] =
    useGetGamesIconBinListMutation();

  const npCommIdList: string[] = [];
  gamesRoutes.forEach((gameRoute) => {
    npCommIdList.push(gameRoute.key);
  });

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    const getIconBinList = async (npCommIdList: string[]): Promise<void> => {
      if (npCommIdList.length) {
        const imgType = IMG_TYPE.WEBP;

        try {
          await getGamesIconBinList({ npCommIdList, imgType })
            .unwrap()
            .then((gameIconList) => {
              const gameRoutesWithIcons: IGameRouteWithIcon[] = [];

              gamesRoutes.forEach((gameRoute) => {
                const gameIcon = _.find(gameIconList, (gameIcon) => {
                  return gameRoute.key === gameIcon.npCommunicationId;
                });

                const gameRouteWithIcon: IGameRouteWithIcon = {
                  ...gameRoute,
                  gameIcon: gameIcon,
                };

                gameRoutesWithIcons.push(gameRouteWithIcon);
              });
              setGameRouteWithIconList(gameRoutesWithIcons);
            });
        } catch (e) {
          console.error(e);
        }
      } else {
        // Show an error message.
      }
    };

    if (!gameRouteWithIconList.length) getIconBinList(npCommIdList);
  }, []);

  //TODO Edit list details
  return (
    <List component="nav" sx={{ height: "100%" }}>
      {gameRouteWithIconList.map((gameRoute: IGameRouteWithIcon) => {
        if (isLoading) return <Loading key={gameRoute.key} />;

        return (
          <div key={gameRoute.key}>
            <GameListItem
              key={gameRoute.key}
              gameRoute={gameRoute}
              gameIcon={gameRoute.gameIcon}
              nested={false}
            />
            {gameRoute.appendDivider && <Divider sx={{ color: "secondary" }} />}
          </div>
        );
      })}
    </List>
  );
};
