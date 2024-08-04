import { useState } from "react";

import { IRouteItem } from "@/models/interfaces";
import { Collapse,Divider, List } from "@mui/material";

import { LogoutButton } from "./LogoutButton";
import { SidebarItem } from "./SidebarItem";

interface SidebarListProps {
  sidebarList: Array<IRouteItem>;
}

export const SidebarList = ({ sidebarList }: SidebarListProps) => {
  const [sidebarListState, setSidebarListState] =
    useState<IRouteItem[]>(sidebarList);

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
      <List component="nav" sx={{ height: "100%", mt: -1 }}>
        {sidebarListState.map((route: IRouteItem) => (
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
        ))}
      </List>
      <LogoutButton />
    </>
  );
};
