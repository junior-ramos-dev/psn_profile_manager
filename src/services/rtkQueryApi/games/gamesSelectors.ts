import { RootState } from "@/store";
import { IGamesInitialState } from "./gamesSlice";

const getGamesState = (state: RootState) => state.games as IGamesInitialState;

export const getGamesList = (state: RootState) =>
  getGamesState(state).gamesList;
export const getGamesRoutesList = (state: RootState) =>
  getGamesState(state).gamesRoutesList;
export const getGamesEtag = (state: RootState) => getGamesState(state).eTag;
