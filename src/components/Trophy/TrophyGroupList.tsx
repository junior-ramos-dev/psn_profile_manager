/** @jsxImportSource @emotion/react */
import {
  ITrophyGroupRoute,
  ITrophyRoute,
  ITrophyRouteWithTrophy,
} from "@/models/interfaces";
import { ITrophyGroupInfo } from "@/models/interfaces/trophy/ITrophy";
import { Divider, List } from "@mui/material";

import { TrophyGroupDetail } from "./TrophyGroupDetail";
import { TrophyListItem } from "./TrophyListItem";

/**
 * Generate ITrophyRoute list objects from ITrophy list
 *
 * @param trophies
 * @returns
 */
const createITrophyGroupRoutesList = (
  trophyGroupInfo: ITrophyGroupInfo[]
): ITrophyGroupRoute[] => {
  const iTrophyGroupRouteList = new Array<ITrophyGroupRoute>();

  for (const group of trophyGroupInfo) {
    const iTrophyRoutesList = new Array<ITrophyRoute>();

    const iTrophyGroupRoute: ITrophyGroupRoute = {
      definedGroupInfo: group.definedGroupInfo,
      earnedGroupInfo: group.earnedGroupInfo,
      trophyRoutesList: [],
    };

    for (const trophy of group.groupTrophies) {
      const trophyRoute: ITrophyRouteWithTrophy = {
        key: `${trophy.trophyId}`,
        title: trophy.trophyName,
        path: "", //`/trophy/${trophyList.gamesTrophies.npCommunicationId}/${trophy.trophyId}`,
        enabled: true,
        appendDivider: true,
        expanded: false,
        trophy: trophy,
      };

      iTrophyRoutesList.push(trophyRoute);
    }

    console.log(iTrophyRoutesList.length);

    iTrophyGroupRoute.trophyRoutesList = iTrophyRoutesList;
    iTrophyGroupRouteList.push(iTrophyGroupRoute);
  }

  return iTrophyGroupRouteList;
};

const getGroupTrophyListItem = (trophyRoute: ITrophyRouteWithTrophy) => {
  return (
    <div key={trophyRoute.key}>
      <TrophyListItem
        key={trophyRoute.key}
        trophyRoute={trophyRoute}
        nested={false}
      />
      {trophyRoute.appendDivider && <Divider sx={{ color: "secondary" }} />}
    </div>
  );
};

interface ITrophyListProps {
  trophyGroupInfo: ITrophyGroupInfo[];
}

export const TrophyGroupList = ({ trophyGroupInfo }: ITrophyListProps) => {
  const iTrophyGroupRouteList = createITrophyGroupRoutesList(trophyGroupInfo);

  return (
    <List component="nav" sx={{ height: "100%" }}>
      {iTrophyGroupRouteList.map((trophyGroupRoute: ITrophyGroupRoute) => {
        return (
          <>
            <TrophyGroupDetail
              definedGroupInfo={trophyGroupRoute.definedGroupInfo}
              earnedGroupInfo={trophyGroupRoute.earnedGroupInfo}
            />
            {trophyGroupRoute.trophyRoutesList.map(
              (trophyRoute: ITrophyRouteWithTrophy) =>
                getGroupTrophyListItem(trophyRoute)
            )}
          </>
        );
      })}
    </List>
  );
};
