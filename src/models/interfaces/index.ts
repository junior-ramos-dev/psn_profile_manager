import IGame from "./games/IGame";
import ITrophy, {
  IDefinedGroupInfo,
  IEarnedGroupInfo,
  ITrophyList,
} from "./trophy/ITrophy";
import IUser from "./user/IUser";
import IRouteItem from "./IRouteItem";

type IAppRoute = IRouteItem;
type IGameRoute = IRouteItem;
type ITrophyRoute = IRouteItem;

interface ITrophyRouteWithTrophy extends ITrophyRoute {
  trophy: ITrophy;
}

interface ITrophyGroupRoute {
  definedGroupInfo: IDefinedGroupInfo;
  earnedGroupInfo: IEarnedGroupInfo;
  trophyRoutesList: ITrophyRoute[];
}

export type {
  IAppRoute,
  IGameRoute,
  IRouteItem,
  ITrophyGroupRoute,
  ITrophyRoute,
  ITrophyRouteWithTrophy,
};

export type { IGame, ITrophy, ITrophyList, IUser };

export { ConvertIGame } from "./games/IGame";
