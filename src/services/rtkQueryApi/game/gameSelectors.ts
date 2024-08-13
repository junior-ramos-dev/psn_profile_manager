import { createSelector } from "@reduxjs/toolkit";

export const selectGamesList = (state) => state.game.gamesList;
export const selectGamesRoutes = (state) => state.game.gamesRoutes;

export const selectGameById = createSelector(
  (state) => state.game.gamesList,
  (_, gameId) => gameId,
  (gamesList, gameId) =>
    gamesList.find((game) => game.npCommunicationId === gameId)
);
