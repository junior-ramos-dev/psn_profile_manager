import { Palette, PaletteColor } from "@mui/material/styles";

import { theme as blue } from "./presets/blue";
import { theme as _default } from "./presets/default";
import { theme as green } from "./presets/green";
import { theme as psnTheme } from "./presets/psnTheme";
import { theme as red } from "./presets/red";

// DeepPartial<Object> means that any key of that object, is not required.
// This works even when we have nested objects and we want all the keys to be optional.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
declare module "@mui/material/styles" {
  // These are the extra keys we added to our theme palette.
  // We are telling TS to chill out in case it encounters these keys
  interface Palette {
    upvote?: PaletteColor;
    downvote?: PaletteColor;
    containerPrimary?: PaletteColor;
    containerSecondary?: PaletteColor;
  }
  // We need to supply it here too, PaletteOptions are used while supplying theme to the context.
  interface PaletteOptions {
    upvote?: PaletteColor;
    downvote?: PaletteColor;
    containerPrimary?: PaletteColor;
    containerSecondary?: PaletteColor;
  }
}
// [IMP] in order to use colour={'upvote'} you need to tell ts this like so:
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    upvote: true;
    downvote: true;
  }
}
// Similarly we want to use upvote as a colour in circular progress component as well
declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    upvote: true;
    downvote: true;
  }
}
// AppTheme is the type of the presetes created in their respective files (blue, default, green, red).
export interface AppTheme {
  dark: {
    palette: DeepPartial<Palette>;
  };
  light: {
    palette: DeepPartial<Palette>;
  };
}

export enum THEME_MODE {
  DARK = "dark",
  LIGHT = "light",
}

// Define an identifier for each preset
export enum THEME_PRESET {
  PSN = 0,
  BLUE = 1,
  GREEN = 2,
  RED = 3,
  DEFAULT = 4,
}

// Create a record mapping the theme identifier and returning its respective color scheme.
export const PRESET_THEME_MAP: Record<THEME_PRESET, AppTheme> = {
  [THEME_PRESET.PSN]: psnTheme,
  [THEME_PRESET.BLUE]: blue,
  [THEME_PRESET.GREEN]: green,
  [THEME_PRESET.RED]: red,
  [THEME_PRESET.DEFAULT]: _default,
};

// Create a record mapping the theme identifier and returning its respective name.
export const PRESET_NAME_MAP: Record<THEME_PRESET, string> = {
  [THEME_PRESET.PSN]: "PSN",
  [THEME_PRESET.BLUE]: "Blue",
  [THEME_PRESET.GREEN]: "Green",
  [THEME_PRESET.RED]: "Red",
  [THEME_PRESET.DEFAULT]: "Default",
};

// Define a type for all colors used by a theme
export type AppThemeColor =
  | "default"
  | "inherit"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";
