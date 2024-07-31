import { ComponentType } from "react";

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
   * "dashboard"
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
   * @type {FC}
   * @memberof IRouteItem
   * @required
   * @example
   * "<Dashboard />"
   */
  component?: any;

  /**
   * The element referenced by the route
   * @type {FC}
   * @memberof IRouteItem
   * @required
   * @example
   * "<Dashboard />"
   */
  element?: any;

  /**
   * The props for component or element referenced by the route
   * @type {any}
   * @memberof IRouteItem
   * @required
   * @example
   * "<Dashboard />"
   */
  props?: any;

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
   * The asset (image/icon) that illustrates the route
   * @type {string}
   * @memberof IRouteItem
   * @optional
   * @example
   * DashboardIcon
   */
  asset?: ComponentType;

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
}

export default IRouteItem;
