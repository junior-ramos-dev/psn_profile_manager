import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";

export const PrivateRoute = () => {
  const isLoggedIn = useSelector(getLoggedIn);

  return !isLoggedIn ? <Navigate replace to={"/auth/login"} /> : <Outlet />;
};
