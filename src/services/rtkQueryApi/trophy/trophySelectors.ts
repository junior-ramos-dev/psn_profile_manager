import { createSelector } from "@reduxjs/toolkit";

export const selectTrophiesList = (state) => state.trophy.trophiesList;

export const selecTrophiesListByGameId = createSelector(
  (state) => state.trophy.trophiesList,
  (_, gameId) => gameId,
  (trophiesList, gameId) =>
    trophiesList.find((trophyList) => trophyList.npCommunicationId === gameId)
);
