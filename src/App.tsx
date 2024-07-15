import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layouts";

import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";

import { PageDefault } from "./components/PageDefault";
import { routes } from "./config";
import { Route as AppRoute } from "./models/types";
import { DefaultRoute, ProtectedRoute } from "./components/Navigation/Routes";

function App() {
  const addRoute = (route: AppRoute) => (
    <Route
      key={route.key}
      path={route.path}
      Component={route.component || PageDefault}
    />
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<DefaultRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            {routes.map((route: AppRoute) =>
              route.subRoutes
                ? route.subRoutes.map((item: AppRoute) => addRoute(item))
                : addRoute(route)
            )}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
