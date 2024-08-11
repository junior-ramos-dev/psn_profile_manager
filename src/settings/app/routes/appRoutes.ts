// icons
// interface
import { RouteObject } from "react-router-dom";

import { IAppRoute } from "@/models/interfaces";
import { Games } from "@/pages/Game";
// pages
import Home from "@/pages/Home";
import { IndexPage } from "@/pages/IndexPage";
import { GamesLoader } from "@/services/routesLoaders/games/gamesLoaders";
import { store } from "@/store";
import DashboardIcon from "@material-ui/icons/BarChartOutlined";
import CodeIcon from "@material-ui/icons/CodeOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/LockOpenOutlined";
import PrivateIcon from "@material-ui/icons/LockOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { URL_ALIAS } from "../constants";

const gamesLoader = new GamesLoader(store, 0);

// Hook used to load app routes into initRouter.tsx
const useAppRouter = () => {
  return createSidebarRouteObjectList();
};

// Add routes for the app side bar
const addSideBarRouteObject = (route: IAppRoute): RouteObject => {
  const sidebarRouteObject: RouteObject = {
    id: route.key,
    path: route.path,
    Component: route.component || IndexPage,
    loader: route.loader || undefined,
  };

  return sidebarRouteObject;
};

/**
 *  Generate RouteObject list from IAppRoute list
 */
const createSidebarRouteObjectList = (): RouteObject[] => {
  // List of RoutObject
  const sidebarRouteObjectList: RouteObject[] = [];

  // Iterate over appRoutes array to add the sidebar app routes
  appRoutes.forEach((appRoute: IAppRoute) => {
    return appRoute.subRoutes
      ? appRoute.subRoutes.map((item: IAppRoute) =>
          sidebarRouteObjectList.push(addSideBarRouteObject(item))
        )
      : sidebarRouteObjectList.push(addSideBarRouteObject(appRoute));
  });

  return sidebarRouteObjectList;
};

// define app routes
const appRoutes: Array<IAppRoute> = [
  {
    key: "router-home",
    title: "Home",
    tooltip: "Home",
    path: "/home",
    enabled: true,
    component: Home,
    asset: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-game",
    title: "Games",
    tooltip: "Games",
    path: `/games/${URL_ALIAS.USER_ID}`,
    enabled: true,
    component: Games,
    loader: gamesLoader.listLoader,
    asset: SportsEsportsIcon,
    // appendDivider: true,
  },
  {
    key: "router-dashboard",
    title: "Dashboard",
    tooltip: "Dashboard",
    path: "/dashboard",
    enabled: true,
    // component: ThemesDemo,
    asset: DashboardIcon,
  },
  {
    key: "router-gh",
    title: "GitHub",
    tooltip: "GitHub",
    enabled: true,
    asset: GitHubIcon,
    subRoutes: [
      {
        key: "router-gh-private",
        title: "Private Repos",
        tooltip: "Private Repos",
        path: "/gh/private",
        enabled: true,
        // component: GHPrivate,
        asset: PrivateIcon,
      },
      {
        key: "router-gh-public",
        title: "Public Repos",
        tooltip: "Public Repos",
        path: "/gh/public",
        enabled: false,
        // component: GHPublic,
        asset: PublicIcon,
      },
    ],
  },
  {
    key: "router-code",
    title: "Code Editor",
    tooltip: "Code Editor",
    path: "/code-editor",
    enabled: true,
    // component: CodeEditor,
    asset: CodeIcon,
    appendDivider: true,
  },
  {
    key: "router-settings",
    title: "Settings",
    tooltip: "Settings",
    path: "/settings",
    enabled: true,
    // component: Settings,
    asset: SettingsIcon,
    appendDivider: true,
  },
];

export { appRoutes, useAppRouter };
