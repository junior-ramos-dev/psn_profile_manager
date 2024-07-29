import { IGame, IGameRoute } from "@/models/interfaces";
import { formatStringToTitleCase } from "@/utils/strings";

//TODO Use getting data from API and persist on DB intead of local storage
export const createIGameRouteList = (gamesList: IGame[]) => {
  gamesList.forEach((game) => {
    let item: IGame = game;
    if (item.trophyTitleDetail) formatStringToTitleCase(item.trophyTitleDetail);
    if (item.trophyTitleName) formatStringToTitleCase(item.trophyTitleName);
  });

  const iGameRouteList = new Array<IGameRoute>();

  gamesList.map((game) => {
    let gameRoute: IGameRoute = {
      key: game.npCommunicationId,
      title: game.trophyTitleName,
      tooltip: game.trophyTitleName,
      path: "/games/" + game.npCommunicationId,
      //component: game,
      props: game,
      enabled: true,
      //   subRoutes: [],
      appendDivider: true,
      expanded: false,
    };

    iGameRouteList.push(gameRoute);
  });

  return iGameRouteList;
};
