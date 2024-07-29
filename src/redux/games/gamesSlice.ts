import { IGame } from "@/models/interfaces";
import { createSlice } from "@reduxjs/toolkit";

type Games = {
  games: IGame[];
};

const initialState = {
  games: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
});

export default gamesSlice.reducer;
