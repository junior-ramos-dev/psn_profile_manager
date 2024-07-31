import { Divider, Drawer as MuiDrawer, styled } from "@mui/material";

import { SidebarList } from "./SidebarList";

import { DRAWER_WIDTH } from "@/settings/app";
import { navClosedMixin, navOpenedMixin } from "@/styles/mixins";
import { IRouteItem } from "@/models/interfaces";
import { Hamburger } from "@/components/Hamburger";

interface SidebarProps {
  routes: Array<IRouteItem>;
  open: boolean | undefined;
  handleClose: () => void;
}

export const Sidebar = ({ routes, open, handleClose }: SidebarProps) => {
  return (
    <Drawer variant="permanent" open={open} onClose={handleClose}>
      <DrawerHeader sx={{ ml: 1.1, mt: 9, mb: -2 }}>
        <Hamburger size={20} toggleNavigation={handleClose} />
      </DrawerHeader>
      <Divider sx={{ width: "250px", ml: -1, borderBottomWidth: 2 }} />
      <SidebarList sidebarList={routes} />
    </Drawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...navOpenedMixin(theme),
    "& .MuiDrawer-paper": navOpenedMixin(theme),
  }),
  ...(!open && {
    ...navClosedMixin(theme),
    "& .MuiDrawer-paper": navClosedMixin(theme),
  }),
}));
