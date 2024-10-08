/** @jsxImportSource @emotion/react */
import { DRAWER_WIDTH } from "@/settings/app/constants";
import { navClosedMixin, navOpenedMixin } from "@/styles/mixins";
import { Hamburger } from "@/ui/components/Hamburger";
import { Divider, Drawer as MuiDrawer, styled } from "@mui/material";

import { SidebarList } from "./SidebarList";

interface SidebarIndexProps {
  open: boolean | undefined;
  handleClose: () => void;
}

export const SidebarIndex = ({ open, handleClose }: SidebarIndexProps) => {
  return (
    <Drawer variant="permanent" open={open} onClose={handleClose}>
      <DrawerHeader sx={{ ml: 1.1, mt: 9, mb: -2 }}>
        <Hamburger size={20} toggleNavigation={handleClose} />
      </DrawerHeader>
      <Divider sx={{ width: "250px", ml: -1, borderBottomWidth: 2 }} />
      <SidebarList />
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
