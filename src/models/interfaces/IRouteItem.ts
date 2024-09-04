import { ComponentType, ElementType } from "react";
import { LoaderFunction } from "react-router-dom";

import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

/**
 * IRouteItem is an interface for defining the application routes and navigation menu items
 */
interface IRouteItem {
  /**
   * The key of the route
   * @type {string}
   * @memberof IRouteItem
   * @required
   * @example
   * "router-dashboard"
   */
  key: string;

  /**
   * The title of the route
   * @type {string}
   * @memberof IRouteItem
   * @required
   * @example
   * "My Dashboard"
   */
  title: string;

  /**
   * The tooltip of the route
   * @type {string}
   * @memberof IRouteItem
   * @required
   * @example
   * "Go to My Dashboard Page"
   */
  tooltip?: string;

  /**
   * The path of the route
   * @type {string}
   * @memberof IRouteItem
   * @required
   * @example
   * "/dashboard"
   */
  path?: string;

  /**
   * The component referenced by the route
   * @type {ComponentType}
   * @memberof IRouteItem
   * @required
   * @example
   * "<Dashboard />"
   */
  component?: ComponentType;

  /**
   * The element referenced by the route
   * @type {EmotionJSX.Element}
   * @memberof IRouteItem
   * @required
   * @example
   * "<Dashboard />"
   */
  element?: () => EmotionJSX.Element;

  /**
   * The loader used by the route
   * @type {LoaderFunction}
   * @memberof IRouteItem
   * @required
   * @example
   * "dashboard.loader"
   */
  loader?: LoaderFunction;

  /**
   * The props for component or element referenced by the route
   * @type {any}
   * @memberof IRouteItem
   * @required
   * @example
   * "{someProp: propValue}"
   */
  props?: object;

  /**
   * The asset (image/icon) that illustrates the route
   * @type {ElementType<ComponentType> | ElementType<object>}
   * @memberof IRouteItem
   * @optional
   * @example
   * <DashboardIcon /> | dashboardIconData: {}
   */
  asset?: ElementType<ComponentType> | ElementType<object>;

  /**
   * The array of sub routes
   * @type {IRouteItem[]}
   * @memberof IRouteItem
   * @optional
   * @example
   * "[{} as IRouteItem, ...]"
   */
  subRoutes?: IRouteItem[];

  /**
   * The status of the route
   * @type {boolean}
   * @memberof IRouteItem
   * @required
   * @example
   * true
   * @default
   * true
   */
  enabled: boolean;

  /**
   * Indicate of menu item is expanded
   * @type {boolean}
   * @memberof IRouteItem
   * @optional
   * @example
   * true
   * @default
   * false
   */
  expanded?: boolean;

  /**
   * The divider indicator for the route
   * @type {boolean}
   * @memberof IRouteItem
   * @optional
   * @example
   * true
   * @default
   * false
   */
  appendDivider?: boolean;
}

export default IRouteItem;
