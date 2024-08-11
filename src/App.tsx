import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import { useAppRouter } from "./settings/app/routes/appRoutes";
import { createGamesRouteObjectList } from "./settings/app/routes/gamesRoutes";
import { getRouter } from "./initRouter";

export const App = () => {
  const sidebarRoutes = useAppRouter();
  const gamesRoutesObj = createGamesRouteObjectList();

  const [gamesRoutes, setGamesRoutes] = useState(gamesRoutesObj);

  if (!gamesRoutes.length) {
    setTimeout(() => {
      if (!gamesRoutes.length) {
        console.log("Loading games routes...");

        setGamesRoutes(createGamesRouteObjectList());
      }
    }, 300);
  }

  const router = getRouter(sidebarRoutes, gamesRoutes);

  return <RouterProvider router={router} />;
};
