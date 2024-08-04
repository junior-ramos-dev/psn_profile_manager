// icons
// interface
import { IRouteItem } from "@/models/interfaces";
import { Games } from "@/pages/Game";
// pages
import Home from "@/pages/Home";
import DashboardIcon from "@material-ui/icons/BarChartOutlined";
import CodeIcon from "@material-ui/icons/CodeOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/LockOpenOutlined";
import PrivateIcon from "@material-ui/icons/LockOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

// define app routes
export const appRoutes: Array<IRouteItem> = [
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
    path: "" /* `/games/${authUser.id}` */,
    enabled: false,
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
