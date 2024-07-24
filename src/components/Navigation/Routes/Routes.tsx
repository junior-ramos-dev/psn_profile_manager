import { useState } from "react";
import { List, Divider, Collapse } from "@mui/material";

import { RouteItem } from "./RouteItem";
import { SignOutRoute } from "./SignOutRoute";

import { IRouteItem } from "@/models/interfaces";

interface RoutesProps {
  routes: Array<IRouteItem>;
}

export const Routes = ({ routes }: RoutesProps) => {
  const [routesState, setRoutesState] = useState<IRouteItem[]>(routes);

  const handleMenuClick = (route: IRouteItem) => {
    const items = routesState.map((item) => {
      if (item.key === route.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setRoutesState(items);
  };

  return (
    <>
      <List component="nav" sx={{ height: "100%" }}>
        {routesState.map((route: IRouteItem) => (
          <div key={route.key}>
            {route.subRoutes ? (
              <>
                <RouteItem
                  key={`${route.key}`}
                  route={route}
                  hasChildren
                  handleMenuClick={handleMenuClick}
                />
                <Collapse in={route.expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.subRoutes.map((sRoute: IRouteItem) => (
                      <RouteItem key={`${sRoute.key}`} route={sRoute} nested />
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <RouteItem key={route.key} route={route} nested={false} />
            )}
            {route.appendDivider && <Divider />}
          </div>
        ))}
      </List>
      <SignOutRoute />
    </>
  );
};
