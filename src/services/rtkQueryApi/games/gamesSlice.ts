import { IGame, IRouteItem } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface IGamesInitialState {
  gamesList: IGame[];
  gamesRoutesList: IRouteItem[];
  eTag: string;
}

const initialState: IGamesInitialState = {
  gamesList: null,
  gamesRoutesList: null,
  eTag: "",
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    actionSetGamesList: (state, { payload: { gamesList, eTag } }) => {
      state.gamesList = gamesList;
      state.eTag = eTag;
    },
    actionSetGamesRoutesList: (state, { payload }) => {
      state.gamesRoutesList = payload;
    },
  },
});

export const { actionSetGamesList, actionSetGamesRoutesList } =
  gamesSlice.actions;

export default gamesSlice.reducer;
