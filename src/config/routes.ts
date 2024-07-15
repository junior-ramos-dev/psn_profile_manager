// icons
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/BarChartOutlined";
import CodeIcon from "@material-ui/icons/CodeOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";
import PrivateIcon from "@material-ui/icons/LockOutlined";
import PublicIcon from "@material-ui/icons/LockOpenOutlined";

// components
import Home from "../pages/Home";
// import { ThemesDemo } from "../components/ThemeSwitch/ThemesDemo";

// interface
import IRouteItem from "../models/interfaces/IRouteItem";

// define app routes
export const routes: Array<IRouteItem> = [
  {
    key: "router-home",
    title: "Home",
    tooltip: "Home",
    path: "/home",
    enabled: true,
    component: Home,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    key: "router-dashboard",
    title: "Dashboard",
    tooltip: "Dashboard",
    path: "/dashboard",
    enabled: true,
    // component: ThemesDemo,
    icon: DashboardIcon,
  },
  {
    key: "router-gh",
    title: "GitHub",
    tooltip: "GitHub",
    enabled: true,
    icon: GitHubIcon,
    subRoutes: [
      {
        key: "router-gh-private",
        title: "Private Repos",
        tooltip: "Private Repos",
        path: "/gh/private",
        enabled: true,
        // component: GHPrivate,
        icon: PrivateIcon,
      },
      {
        key: "router-gh-public",
        title: "Public Repos",
        tooltip: "Public Repos",
        path: "/gh/public",
        enabled: false,
        // component: GHPublic,
        icon: PublicIcon,
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
    icon: CodeIcon,
    appendDivider: true,
  },
  {
    key: "router-settings",
    title: "Settings",
    tooltip: "Settings",
    path: "/settings",
    enabled: true,
    // component: Settings,
    icon: SettingsIcon,
  },
];
