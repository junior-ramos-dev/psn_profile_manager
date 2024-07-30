import { IGame, IRouteItem } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface IGamesInitialState {
  games: IGame[];
  gamesRoutes: IRouteItem[];
}

const initialState: IGamesInitialState = {
  games: null,
  gamesRoutes: null,
};

const gamesSlice = createSlice({
  name: "gamesSlice",
  initialState,
  reducers: {
    actionSetGames: (state, { payload: { games } }) => {
      state.games = games;
    },
    actionSetGamesRoutes: (state, { payload: { gamesRoutes } }) => {
      state.games = gamesRoutes;
    },
  },
});

export const { actionSetGames, actionSetGamesRoutes } = gamesSlice.actions;

export default gamesSlice.reducer;
