import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Navigate replace to={"/"} /> : <Outlet />;
};
