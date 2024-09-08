/** @jsxImportSource @emotion/react */
import { ITrophyRoute, ITrophyRouteWithTrophy } from "@/models/interfaces";
import { ITrophyList } from "@/models/interfaces/trophy/ITrophy";
import { useGetTrophyListQuery } from "@/services/rtkQueryApi/trophy/trophyApi";
import { Divider, List } from "@mui/material";

import { Loading } from "../Loading";

import { TrophyListItem } from "./TrophyListItem";

/**
 * Generate ITrophyRoute list objects from ITrophy list
 *
 * @param trophyList
 * @returns
 */
const createITrophyRoutesList = (trophyList: ITrophyList): ITrophyRoute[] => {
  const iTrophyRoutesList = new Array<ITrophyRoute>();

  const trophies = trophyList.gamesTrophies.trophies;

  trophies.forEach((trophy) => {
    const trophyRoute: ITrophyRouteWithTrophy = {
      key: `${trophyList.gamesTrophies.npCommunicationId}-${trophy.trophyId}`,
      title: trophy.trophyName,
      tooltip: trophy.trophyName,
      path: `/trophy/${trophyList.gamesTrophies.npCommunicationId}/${trophy.trophyId}`,
      enabled: true,
      appendDivider: true,
      expanded: false,
      trophy: trophy,
    };

    iTrophyRoutesList.push(trophyRoute);
  });

  return iTrophyRoutesList;
};

interface ITrophyTrophyListProps {
  npCommunicationId: string;
  trophyTitlePlatform: string;
}

export const TrophyList = ({
  npCommunicationId,
  trophyTitlePlatform,
}: ITrophyTrophyListProps) => {
  const { data: trophyList, isLoading /* isError, isSuccess   */ } =
    useGetTrophyListQuery(
      { trophyTitlePlatform, npCommunicationId }
      // {
      //   pollingInterval: 60 * 60 * 1000 * 2, //(60 * 60 * 1000 * 2) = 2h
      //   // refetchOnFocus: true,
      //   refetchOnMountOrArgChange: true,
      //   skip: false,
      // }
    );

  if (isLoading) return <Loading />;

  const iTrophyRoutesList = createITrophyRoutesList(trophyList);

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
