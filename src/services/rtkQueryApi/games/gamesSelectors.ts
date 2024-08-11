import { createSelector } from "@reduxjs/toolkit";

export const selectGamesList = (state) => state.games.gamesList;
export const selectGamesRoutes = (state) => state.games.gamesRoutes;

export const selectGameById = createSelector(
  (state) => state.games.gamesList,
  (_, gameId) => gameId,
  (gamesList, gameId) =>
    gamesList.find((game) => game.npCommunicationId === gameId)
);
