import { List, Divider } from "@mui/material";

import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { gamesSelectors } from "@/services/rtkQueryApi/games";

import { IGameRoute } from "@/models/interfaces";
import { GameRouteItem } from "./GameRouteItem";

export const GamesRoutes = () => {
  const gamesRoutes = useAppSelector(gamesSelectors.getGamesRoutesList);

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
