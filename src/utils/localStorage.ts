import { ConvertIGame } from "@/models/interfaces/IGame";

//TODO Add to persist store
export const getIGamesFromLocalStorage = () =>
  ConvertIGame.fromJsonList(localStorage.getItem("gamesList" || null));
