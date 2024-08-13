import { IGame, IGameRoute } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface IGameInitialState {
  gamesList: IGame[];
  gamesRoutes: IGameRoute[];
}

const initialState: IGameInitialState = {
  gamesList: null,
  gamesRoutes: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    actionSetGamesList: (state, { payload }) => {
      state.gamesList = payload;
    },
    actionSetGamesRoutes: (state, { payload }) => {
      state.gamesRoutes = payload;
    },
  },
});

export const { actionSetGamesList, actionSetGamesRoutes } = gameSlice.actions;

export default gameSlice.reducer;
