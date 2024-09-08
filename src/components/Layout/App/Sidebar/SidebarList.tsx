import { useState } from "react";

import { IRouteItem } from "@/models/interfaces";
import { sideBarRoutes } from "@/settings/app/routes";
import { Box, Collapse, Divider, List } from "@mui/material";

import { ActionLogout } from "../Header/Menu/Actions/ActionItemsIndex";

import { SidebarItem } from "./SidebarItem";

export const SidebarList = () => {
  const [sidebarListState, setSidebarListState] =
    useState<IRouteItem[]>(sideBarRoutes);

  const handleMenuClick = (route: IRouteItem) => {
    const items = sidebarListState.map((item) => {
      if (item.key === route.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setSidebarListState(items);
  };

  return (
    <>
      <List component="nav" sx={{ height: "72.5%", mt: -1 }}>
        {sidebarListState.map((route: IRouteItem) => {
          return (
            <div key={route.key}>
              {route.subRoutes ? (
                <>
                  <SidebarItem
                    key={`${route.key}`}
                    route={route}
                    hasChildren
                    handleMenuClick={handleMenuClick}
                  />
                  <Collapse in={route.expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {route.subRoutes.map((sRoute: IRouteItem) => (
                        <SidebarItem
                          key={`${sRoute.key}`}
                          route={sRoute}
                          nested
                        />
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <SidebarItem key={route.key} route={route} nested={false} />
              )}
              {route.appendDivider && <Divider />}
            </div>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ alignItems: "center", ml: 2, mt: 1, mb: 1 }}>
        <ActionLogout disableTitle={true} iconColor="warning" />
      </Box>
      <Divider />
    </>
  );
};
