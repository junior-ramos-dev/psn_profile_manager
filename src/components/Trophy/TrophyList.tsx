import { ITrophyRoute } from "@/models/interfaces";
import { ITrophyList } from "@/models/interfaces/trophy/ITrophy";
import { Divider, List } from "@mui/material";

import { TrophyListItem } from "./TrophyListItem";

interface ITrophyTrophyListProps {
  trophyList: ITrophyList;
}

/**
 * Generate ITrophyRoute list objects from ITrophy list
 *
 * @param trophyList
 * @returns
 */
const createITrophyRoutesList = (trophyList: ITrophyList): ITrophyRoute[] => {
  const iTrophyRoutesList = new Array<ITrophyRoute>();

  trophyList.trophies.forEach((trophy) => {
    const trophyRoute: ITrophyRoute = {
      key: `${trophyList.npCommunicationId}-${trophy.trophyId}`,
      title: trophy.trophyName,
      tooltip: trophy.trophyName,
      path: `/trophy/${trophyList.npCommunicationId}/${trophy.trophyId}`,
      enabled: true,
      appendDivider: true,
      expanded: false,
    };

    iTrophyRoutesList.push(trophyRoute);
  });

  return iTrophyRoutesList;
};

export const TrophyList = ({ trophyList }: ITrophyTrophyListProps) => {
  const iTrophyRoutesList = createITrophyRoutesList(trophyList);

  //TODO Edit list details
  return (
    <List component="nav" sx={{ height: "100%" }}>
      {iTrophyRoutesList.map((trophyRoute: ITrophyRoute) => {
        return (
          <div key={trophyRoute.key}>
            <TrophyListItem
              key={trophyRoute.key}
              trophyRoute={trophyRoute}
              nested={false}
            />
            {trophyRoute.appendDivider && (
              <Divider sx={{ color: "secondary" }} />
            )}
          </div>
        );
      })}
    </List>
  );
};
