import { List, Divider } from "@mui/material";

import { GameRouteItem } from "./GameRouteItem";

import { IGameRoute } from "@/models/interfaces";
import { createIGameRouteList } from "@/utils/routes";

import { getIGamesFromLocalStorage } from "@/utils/localStorage";

export const GamesRoutes = () => {
  const localGamesList = getIGamesFromLocalStorage();

  const gamesRoutes = createIGameRouteList(localGamesList);

  //TODO Edit list details
  return (
    <List component="nav" sx={{ height: "100%" }}>
      {gamesRoutes.map((gameRoute: IGameRoute) => (
        <div key={gameRoute.key}>
          <GameRouteItem
            key={gameRoute.key}
            gameRoute={gameRoute}
            nested={false}
          />
          {gameRoute.appendDivider && <Divider sx={{ color: "secondary" }} />}
        </div>
      ))}
    </List>
  );
};
