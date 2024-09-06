import IGame from "./games/IGame";
import ITrophy, { ITrophyList } from "./trophy/ITrophy";
import IUser from "./user/IUser";
import IRouteItem from "./IRouteItem";

type IAppRoute = IRouteItem;
type IGameRoute = IRouteItem;
type ITrophyRoute = IRouteItem;

interface ITrophyRouteWithTrophy extends ITrophyRoute {
  trophy: ITrophy;
}

export type {
  IAppRoute,
  IGameRoute,
  IRouteItem,
  ITrophyRoute,
  ITrophyRouteWithTrophy,
};

export type { IGame, ITrophy, ITrophyList, IUser };

export { ConvertIGame } from "./games/IGame";
