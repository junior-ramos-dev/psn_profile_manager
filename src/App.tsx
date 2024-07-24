import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div id="routesChildren">
      App
      <Outlet />
    </div>
  );
};
