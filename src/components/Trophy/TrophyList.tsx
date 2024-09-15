/** @jsxImportSource @emotion/react */
import { ITrophyRoute, ITrophyRouteWithTrophy } from "@/models/interfaces";
import ITrophy from "@/models/interfaces/trophy/ITrophy";
import { Divider, List } from "@mui/material";

import { TrophyListItem } from "./TrophyListItem";

/**
 * Generate ITrophyRoute list objects from ITrophy list
 *
 * @param trophies
 * @returns
 */
const createITrophyRoutesList = (trophies: ITrophy[]): ITrophyRoute[] => {
  const iTrophyRoutesList = new Array<ITrophyRoute>();

  trophies.forEach((trophy) => {
    const trophyRoute: ITrophyRouteWithTrophy = {
      key: `${trophy.trophyId}`,
      title: trophy.trophyName,
      tooltip: trophy.trophyName,
      path: "", //`/trophy/${trophyList.gamesTrophies.npCommunicationId}/${trophy.trophyId}`,
      enabled: true,
      appendDivider: true,
      expanded: false,
      trophy: trophy,
    };

    iTrophyRoutesList.push(trophyRoute);
  });

  return iTrophyRoutesList;
};

interface ITrophyListProps {
  trophies: ITrophy[];
}

export const TrophyList = ({ trophies }: ITrophyListProps) => {
  const iTrophyRoutesList = createITrophyRoutesList(trophies);

  return (
    <List component="nav" sx={{ height: "100%" }}>
      {iTrophyRoutesList.map((trophyRoute: ITrophyRouteWithTrophy) => {
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
