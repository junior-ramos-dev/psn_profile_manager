import { ConvertIGame } from "@/models/interfaces/IGame";

//TODO See iusage of useStorage hook
export const getIGamesFromLocalStorage = () =>
  ConvertIGame.fromJsonList(localStorage.getItem("gamesList" || null));
