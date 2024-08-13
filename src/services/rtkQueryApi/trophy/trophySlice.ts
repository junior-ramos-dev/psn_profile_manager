import { ITrophyList } from "@/models/interfaces/trophy/ITrophy";
import { createSlice } from "@reduxjs/toolkit";

export interface ITrophyInitialState {
  trophiesList: ITrophyList[];
}

const initialState: ITrophyInitialState = {
  trophiesList: null,
};

const gameSlice = createSlice({
  name: "trophy",
  initialState,
  reducers: {
    actionSetTrophiesList: (state, { payload }) => {
      state.trophiesList = [...state.trophiesList, payload];
    },
  },
});

export const { actionSetTrophiesList } = gameSlice.actions;

export default gameSlice.reducer;
