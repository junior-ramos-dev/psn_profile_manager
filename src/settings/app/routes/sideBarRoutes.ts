import { RouteObject } from "react-router-dom";

import { IAppRoute } from "@/models/interfaces";
import { GamesLoader } from "@/services/routesLoaders/games/gamesLoaders";
import { store } from "@/store";
import Dashboard from "@/ui/pages/Dashboard";
import Games from "@/ui/pages/Games";
import Home from "@/ui/pages/Home";
import Index from "@/ui/pages/Index";
import DashboardIcon from "@material-ui/icons/BarChartOutlined";
import HomeIcon from "@material-ui/icons/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const gamesLoader = new GamesLoader(store);

// Hook used to load app routes into initRouter.tsx
const useSidebarRoutes = () => {
  return generateSidebarRouteObjectList();
};

/**
 * Create game RouteObject from IAppRoute
 *
 * @param route
 * @returns
 */
const createSideBarRouteObject = (route: IAppRoute): RouteObject => {
  const sidebarRouteObject: RouteObject = {
    id: route.key,
    path: route.path,
    Component: route.component || Index,
    loader: route.loader || undefined,
  };

  return sidebarRouteObject;
};

/**
 *  Generate RouteObject list from IAppRoute list
 */
const generateSidebarRouteObjectList = (): RouteObject[] => {
  // List of RoutObject
  const sidebarRouteObjectList: RouteObject[] = [];

  // Iterate over sideBarRoutes array to add the sidebar app routes
  sideBarRoutes.forEach((appRoute: IAppRoute) => {
    return appRoute.subRoutes
      ? appRoute.subRoutes.map((item: IAppRoute) =>
          sidebarRouteObjectList.push(createSideBarRouteObject(item))
        )
      : sidebarRouteObjectList.push(createSideBarRouteObject(appRoute));
  });

  return sidebarRouteObjectList;
};

// define app routes
const sideBarRoutes: Array<IAppRoute> = [
  {
    key: "router-home",
    title: "Home",
    tooltip: "Home",
    path: "/home",
    enabled: true,
    component: Home,
    loader: gamesLoader.listLoader,
    asset: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-game",
    title: "Games",
    tooltip: "Games",
    path: `/game/list`,
    enabled: true,
    component: Games,
    asset: SportsEsportsIcon,
    // appendDivider: true,
  },
  {
    key: "router-dashboard",
    title: "Dashboard",
    tooltip: "Dashboard",
    path: "/dashboard",
    enabled: true,
    component: Dashboard,
    asset: DashboardIcon,
    appendDivider: true,
  },
  // {
  //   key: "router-gh",
  //   title: "GitHub",
  //   tooltip: "GitHub",
  //   enabled: true,
  //   asset: GitHubIcon,
  //   subRoutes: [
  //     {
  //       key: "router-gh-private",
  //       title: "Private Repos",
  //       tooltip: "Private Repos",
  //       path: "/gh/private",
  //       enabled: true,
  //       // component: GHPrivate,
  //       asset: PrivateIcon,
  //     },
  //     {
  //       key: "router-gh-public",
  //       title: "Public Repos",
  //       tooltip: "Public Repos",
  //       path: "/gh/public",
  //       enabled: false,
  //       // component: GHPublic,
  //       asset: PublicIcon,
  //     },
  //   ],
  // },
  // {
  //   key: "router-code",
  //   title: "Code Editor",
  //   tooltip: "Code Editor",
  //   path: "/code-editor",
  //   enabled: true,
  //   // component: CodeEditor,
  //   asset: CodeIcon,
  //   appendDivider: true,
  // },
  // {
  //   key: "router-settings",
  //   title: "Settings",
  //   tooltip: "Settings",
  //   path: "/settings",
  //   enabled: true,
  //   // component: Settings,
  //   asset: SettingsIcon,
  //   appendDivider: true,
  // },
];

export { sideBarRoutes, useSidebarRoutes };
