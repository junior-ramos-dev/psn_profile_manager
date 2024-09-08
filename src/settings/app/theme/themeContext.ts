import { createContext } from "react";

export interface IThemeContext {
  toggleThemeMode: () => void;
  shuffleThemeColor: () => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);
