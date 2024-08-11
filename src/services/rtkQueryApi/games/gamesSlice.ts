import { IGame, IGameRoute } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface IGamesInitialState {
  gamesList: IGame[];
  gamesRoutes: IGameRoute[];
}

const initialState: IGamesInitialState = {
  gamesList: null,
  gamesRoutes: null,
};

const gamesSlice = createSlice({
  name: "games",
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

export const { actionSetGamesList, actionSetGamesRoutes } = gamesSlice.actions;

export default gamesSlice.reducer;
