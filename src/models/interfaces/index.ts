import IGame from "./games/IGame";
import IRouteItem from "./IRouteItem";
import IUser from "./IUser";

type IAppRoute = IRouteItem;
type IGameRoute = IRouteItem;

export type { IAppRoute, IGame, IGameRoute, IRouteItem, IUser };

export { ConvertIGame } from "./games/IGame";
