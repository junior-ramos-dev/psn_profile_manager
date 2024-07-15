// GameRoute is a type for defining the games routes navigation menu items
export type GameRoute = {
  key: string;
  title: string;
  tooltip?: string;
  path?: string;
  component?: any;
  enabled: boolean;
  image?: string;
  subRoutes?: Array<GameRoute>;
  appendDivider?: boolean;
  expanded?: boolean;
};
