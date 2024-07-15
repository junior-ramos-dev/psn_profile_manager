import { ComponentType } from "react";

// RouteItem is an interface for defining the application routes and navigation menu items
interface IRouteItem {
  key: string;
  title: string;
  tooltip?: string;
  path?: string;
  component?: any;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<IRouteItem>;
  appendDivider?: boolean;
}

export default IRouteItem;
