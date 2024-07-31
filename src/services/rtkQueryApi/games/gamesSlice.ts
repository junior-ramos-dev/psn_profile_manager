import { IGame, IRouteItem } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface IGamesInitialState {
  gamesList: IGame[];
  gamesRoutesList: IRouteItem[];
}

const initialState: IGamesInitialState = {
  gamesList: null,
  gamesRoutesList: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    actionSetGamesList: (state, { payload }) => {
      state.gamesList = payload;
    },
    actionSetGamesRoutesList: (state, { payload }) => {
      state.gamesRoutesList = payload;
    },
  },
});

export const { actionSetGamesList, actionSetGamesRoutesList } =
  gamesSlice.actions;

export default gamesSlice.reducer;
