import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";

export const PublicRoute = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  return isLoggedIn ? <Navigate replace to={"/"} /> : <Outlet />;
};
