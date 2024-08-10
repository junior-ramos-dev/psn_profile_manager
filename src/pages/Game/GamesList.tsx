import { useSelector } from "react-redux";

import { IRouteItem } from "@/models/interfaces";
import { getGamesList } from "@/services/rtkQueryApi/games/gamesSelectors";
import { createIGameRoutesList } from "@/settings/app/routes/gamesRoutes";
import { Divider, List } from "@mui/material";

import { GameListItem } from "./GameListItem";

export const GamesList = () => {
  const gamesList = useSelector(getGamesList);
  const gamesRoutesList = createIGameRoutesList(gamesList);

  //TODO Edit list details
  return (
    <List component="nav" sx={{ height: "100%" }}>
      {gamesRoutesList.map((gameRoute: IRouteItem) => {
        return (
          <div key={gameRoute.key}>
            <GameListItem key={`${gameRoute.key}`} gameRoute={gameRoute} />
            {gameRoute.appendDivider && <Divider sx={{ color: "secondary" }} />}
          </div>
        );
      })}
    </List>
  );

  // return (
  //   <List component="nav" sx={{ height: "100%" }}>
  //     {gamesRoutes.map((gameRoute: IGameRoute) => (
  //       <div key={gameRoute.key}>
  //         <GameRouteItem
  //           key={gameRoute.key}
  //           gameRoute={gameRoute}
  //           nested={false}
  //         />
  //         {gameRoute.appendDivider && <Divider sx={{ color: "secondary" }} />}
  //       </div>
  //     ))}
  //   </List>
  // );
};
