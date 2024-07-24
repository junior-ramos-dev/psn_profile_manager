import { useState } from "react";
import { List, Divider, Collapse } from "@mui/material";

import { GameRouteItem } from "./GameRouteItem";

import { gamesRoutes } from "@/config/routes/gamesRoutes";
import { GameRoute } from "@/models/types/game/GameRoute";

export const GamesRoutes = () => {
  const [gamesRoutesState, setGamesRoutesState] =
    useState<GameRoute[]>(gamesRoutes);

  const handleMenuClick = (gameRoute: GameRoute) => {
    const items = gamesRoutesState.map((item) => {
      if (item.key === gameRoute.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setGamesRoutesState(items);
  };
  //TODO Edit list details
  return (
    <>
      <List component="nav" sx={{ height: "100%" }}>
        {gamesRoutesState.map((gameRoute: GameRoute) => (
          <div key={gameRoute.key}>
            {gameRoute.subRoutes.length > 0 ? (
              <>
                {/* <GameRouteItem
                  key={`${gameRoute.key}`}
                  gameRoute={gameRoute}
                  hasChildren
                  handleMenuClick={handleMenuClick}
                />
                <Collapse in={gameRoute.expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {gameRoute.subRoutes.map((sRoute: GameRoute) => (
                      <GameRouteItem
                        key={`${sRoute.key}`}
                        gameRoute={sRoute}
                        nested
                      />
                    ))}
                  </List>
                </Collapse> */}
              </>
            ) : (
              <GameRouteItem
                key={gameRoute.key}
                gameRoute={gameRoute}
                nested={false}
              />
            )}
            {gameRoute.appendDivider && <Divider sx={{ color: "secondary" }} />}
            {/* <Divider /> */}
          </div>
        ))}
      </List>
    </>
  );
};
