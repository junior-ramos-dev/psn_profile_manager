import IGame from "./games/IGame";
import IRouteItem from "./IRouteItem";
import IUser from "./IUser";

export type { IGame, IRouteItem, IUser };
export type IAppRoute = IRouteItem;
export type IGameRoute = IRouteItem;

export { ConvertIGame } from "./games/IGame";
