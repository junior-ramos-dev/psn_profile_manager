import { ITrophy, ITrophyRoute } from "@/models/interfaces";

/**
 *  Generate ITrophyRoute list objects from ITrophy list
 */
const createITrophyRoutesList = (
  trophyList: ITrophy[],
  npCommunicationId: string
): ITrophyRoute[] => {
  const iTrophyRoutesList = new Array<ITrophyRoute>();

  trophyList.forEach((trophy) => {
    const trophyRoute: ITrophyRoute = {
      key: `${npCommunicationId}-${trophy.trophyId}`,
      title: trophy.trophyName,
      tooltip: trophy.trophyName,
      path: `/trophy/${npCommunicationId}/${trophy.trophyId}`,
      enabled: true,
      appendDivider: true,
      expanded: false,
    };

    iTrophyRoutesList.push(trophyRoute);
  });

  return iTrophyRoutesList;
};

export { createITrophyRoutesList };
