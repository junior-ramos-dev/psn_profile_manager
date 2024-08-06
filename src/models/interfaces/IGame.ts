import { StringUtils } from "@/utils/strings";

import { TrophyCount } from "../types/trophy/TrophyCount";

// IGame is an interface for defining the game object returned from the API with additional properties to generate the routes for games.
interface IGame {
  npServiceName: string;
  npCommunicationId: string;
  trophySetVersion: string;
  trophyTitleName: string;
  trophyTitleDetail: string;
  trophyTitleIconUrl: string;
  trophyTitlePlatform: string;
  hasTrophyGroups: boolean;
  trophyGroupCount: number;
  definedTrophies: TrophyCount;
  progress: number;
  earnedTrophies: TrophyCount;
  hiddenFlag: boolean;
  lastUpdatedDateTime: Date | string | number;
}

export interface IGameApi extends Omit<IGame, "lastUpdatedDateTime"> {
  lastUpdatedDateTime: string;
}

/* 
# To parse this data:
#
#   import { ConvertIGame, IGame } from "./file";
# 
#   const game = Convert.fromApiResponseToIGameList(gamesList);
# 
# These functions will throw an error if the JSON doesn't
# match the expected interface, even if the JSON is valid.
*/

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class ConvertIGame {
  public static fromApiResponseToIGameList(gamesList: IGame[]): IGame[] {
    const cloneGamesList = structuredClone(gamesList);

    const gamesListParsed = cloneGamesList.map((game) => {
      const gameKeys = Object.keys(game);
      for (const key in gameKeys) {
        if (gameKeys[key] === "lastUpdatedDateTime") {
          game.lastUpdatedDateTime = Date.parse(
            game.lastUpdatedDateTime as string
          );
        }
      }

      const gameString = JSON.stringify(game);
      const iGame = ConvertIGame.fromJsonObject(gameString);

      if (iGame.trophyTitleDetail)
        iGame.trophyTitleDetail = StringUtils.formatStringToTitleCase(
          iGame.trophyTitleDetail
        );
      if (iGame.trophyTitleName)
        iGame.trophyTitleName = StringUtils.formatStringToTitleCase(
          iGame.trophyTitleName
        );

      return iGame;
    });

    return gamesListParsed;
  }

  public static fromJsonObject(json: string): IGame {
    return JSON.parse(json);
  }

  public static toJsonObject(value: IGame): string {
    return JSON.stringify(value);
  }

  // public static fromJsonList(array: string): IGame[] {
  //   const iGameArray = new Array<IGame>();

  //   const jsonArray = JSON.parse(array);
  //   jsonArray.forEach((json) => iGameArray.push(cast(json, r("IGame"))));

  //   return iGameArray;
  // }

  // public static toJsonList(array: IGame[]): string[] {
  //   const jsonArray = new Array<string>();
  //   array.forEach((iGame) =>
  //     jsonArray.push(cast(JSON.stringify(iGame), r("IGame")))
  //   );

  //   return jsonArray;
  // }
}

export default IGame;
