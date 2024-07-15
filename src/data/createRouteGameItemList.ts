/// <reference path="node.d.ts" />

import * as fs from "fs";

import { games } from "./games";

import { GameRoute } from "../models/types/game/GameRoute";

//FIXME Use API
//   const gameList = new Array<Game>();
//   gamesRoutesState.forEach((obj) => {
//     let item: Game = obj;
//     if (item.trophyTitleDetail) formatStringToTitleCase(item.trophyTitleDetail);
//     if (item.trophyTitleName) formatStringToTitleCase(item.trophyTitleName);
//     item.appendDivider = false;
//     item.expanded = false;
//     let gameItem = ConvertGame.toGame(item);
//     gameList.push(item);
//   });
//   console.log(JSON.stringify(gameList));

const create = () => {
  const list = new Array<GameRoute>();

  games.map((g) => {
    let gameRoute: GameRoute = {
      key: g.npCommunicationId,
      title: g.trophyTitleName,
      tooltip: g.trophyTitleName,
      path: "/" + g.npCommunicationId,
      component: "GameDetails",
      enabled: true,
      subRoutes: [],
      appendDivider: true,
      expanded: false,
    };

    list.push(gameRoute);
  });

  fs.writeFile(
    "/Users/junioramos/workspaces/psn_trophies_app/psn_react_app/src/pages/Game/json/routeGameList.json",
    JSON.stringify(list),
    function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("File created!");
    }
  );

  // console.log(JSON.stringify(list));
};

create();
