import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return !isLoggedIn ? <Navigate replace to={"/auth/login"} /> : <Outlet />;
};
