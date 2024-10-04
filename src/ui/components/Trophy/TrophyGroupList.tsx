/** @jsxImportSource @emotion/react */
import {
  ITrophyGroupRoute,
  ITrophyRoute,
  ITrophyRouteExtended,
} from "@/models/interfaces";
import { ITrophyGroupsInfo } from "@/models/interfaces/trophy/ITrophy";
import { Divider, List } from "@mui/material";

import { TrophyGroupDetail } from "./TrophyGroupDetail";
import { TrophyListItem } from "./TrophyListItem";

/**
 * Generate ITrophyRoute list objects from ITrophy list
 *
 * @param trophies
 * @returns ITrophyGroupRoute[]
 */
const createITrophyGroupRoutesList = (
  npCommunicationId: string,
  trophyTitlePlatform: string,
  trophyGroupsInfo: ITrophyGroupsInfo[]
): ITrophyGroupRoute[] => {
  const iTrophyGroupRouteList = new Array<ITrophyGroupRoute>();

  for (const group of trophyGroupsInfo) {
    const iTrophyRoutesList = new Array<ITrophyRoute>();

    const iTrophyGroupRoute: ITrophyGroupRoute = {
      definedGroupInfo: group.definedGroupInfo,
      earnedGroupInfo: group.earnedGroupInfo,
      trophyRoutesList: [],
    };

    for (const trophy of group.groupTrophies) {
      const trophyRoute: ITrophyRouteExtended = {
        key: `${trophy.trophyId}`,
        title: trophy.trophyName,
        npCommunicationId: npCommunicationId,
        trophyTitlePlatform: trophyTitlePlatform,
        trophy: trophy,
        path: "", //`/trophy/${trophyList.gamesTrophies.npCommunicationId}/${trophy.trophyId}`,
        enabled: true,
        appendDivider: true,
        expanded: false,
      };

      iTrophyRoutesList.push(trophyRoute);
    }

    iTrophyGroupRoute.trophyRoutesList = iTrophyRoutesList;
    iTrophyGroupRouteList.push(iTrophyGroupRoute);
  }

  return iTrophyGroupRouteList;
};

// Create the list item for each trophy
const getGroupTrophyListItem = (trophyRoute: ITrophyRouteExtended) => {
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
  npCommunicationId: string;
  trophyTitlePlatform: string;
  trophyGroupsInfo: ITrophyGroupsInfo[];
}

export const TrophyGroupList = ({
  npCommunicationId,
  trophyTitlePlatform,
  trophyGroupsInfo,
}: ITrophyListProps) => {
  const iTrophyGroupRouteList = createITrophyGroupRoutesList(
    npCommunicationId,
    trophyTitlePlatform,
    trophyGroupsInfo
  );

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
              (trophyRoute: ITrophyRouteExtended) =>
                getGroupTrophyListItem(trophyRoute)
            )}
          </>
        );
      })}
    </List>
  );
};
