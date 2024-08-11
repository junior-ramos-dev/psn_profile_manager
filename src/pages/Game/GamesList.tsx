import { useSelector } from "react-redux";

import { IGameRoute } from "@/models/interfaces";
import { selectGamesRoutes } from "@/services/rtkQueryApi/games/gamesSelectors";
import { Divider, List } from "@mui/material";

import { GameListItem } from "./GameListItem";

export const GamesList = () => {
  const gamesRoutes = useSelector(selectGamesRoutes);

  //TODO Edit list details
  return (
    <List component="nav" sx={{ height: "100%" }}>
      {gamesRoutes.map((gameRoute: IGameRoute) => (
        <div key={gameRoute.key}>
          <GameListItem
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
