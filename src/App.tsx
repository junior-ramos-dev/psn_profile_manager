import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import { useAppRouter } from "./settings/app/routes/appRoutes";
import { useGamesRouter } from "./settings/app/routes/gamesRoutes";
import { getRouter } from "./initRouter";

export const App = () => {
  const [gamesRoutes, setGamesRoutes] = useState([]);

  const sidebarRoutes = useAppRouter();

  setTimeout(() => {
    if (!gamesRoutes.length) {
      console.log("Loading games routes...");

      setGamesRoutes(useGamesRouter());
    }
  }, 300);

  const router = getRouter(sidebarRoutes, gamesRoutes);

  return <RouterProvider router={router} />;
};
