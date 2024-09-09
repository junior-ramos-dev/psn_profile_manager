import { Palette, PaletteColor } from "@mui/material/styles";

import { theme as blue } from "./presets/blue";
import { theme as _default } from "./presets/default";
import { theme as green } from "./presets/green";
import { theme as psnTheme } from "./presets/psnTheme";
import { theme as red } from "./presets/red";

// DeepPartial<Object> means that any key of that object, is not reauired.
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

// Define an identifier for each preset
export enum PRESETS_COLORS {
  PSN = 0,
  BLUE = 1,
  GREEN = 2,
  RED = 3,
  DEFAULT = 4,
}

// Define a type for all presets
export type THEME_PRESETS =
  | PRESETS_COLORS.PSN
  | PRESETS_COLORS.BLUE
  | PRESETS_COLORS.GREEN
  | PRESETS_COLORS.RED
  | PRESETS_COLORS.DEFAULT;

// Create a record mapping the theme identifier and returning its respective color scheme.
export const PRESET_THEME_MAP: Record<PRESETS_COLORS, AppTheme> = {
  [PRESETS_COLORS.PSN]: psnTheme,
  [PRESETS_COLORS.BLUE]: blue,
  [PRESETS_COLORS.GREEN]: green,
  [PRESETS_COLORS.RED]: red,
  [PRESETS_COLORS.DEFAULT]: _default,
};

// Create a record mapping the theme identifier and returning its respective name.
export const PRESET_NAME_MAP: Record<PRESETS_COLORS, string> = {
  [PRESETS_COLORS.PSN]: "PSN Theme",
  [PRESETS_COLORS.BLUE]: "Blue Theme",
  [PRESETS_COLORS.GREEN]: "Green Theme",
  [PRESETS_COLORS.RED]: "Ted Theme",
  [PRESETS_COLORS.DEFAULT]: "Default Theme",
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
