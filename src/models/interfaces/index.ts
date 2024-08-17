import IGame from "./games/IGame";
import ITrophy from "./trophy/ITrophy";
import IUser from "./user/IUser";
import IRouteItem from "./IRouteItem";

type IAppRoute = IRouteItem;
type IGameRoute = IRouteItem;
type ITrophyRoute = IRouteItem;

export type { IAppRoute, IGameRoute, IRouteItem, ITrophyRoute };

export type { IGame, ITrophy, IUser };

export { ConvertIGame } from "./games/IGame";
