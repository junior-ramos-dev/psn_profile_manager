import { IGame } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface IGamesInitialState {
  gamesList: IGame[];
}

const initialState: IGamesInitialState = {
  gamesList: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    actionSetGamesList: (state, { payload }) => {
      state.gamesList = payload;
    },
  },
});

export const { actionSetGamesList } = gamesSlice.actions;

export default gamesSlice.reducer;
