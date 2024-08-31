import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";

export const PublicRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate replace to={"/"} /> : <Outlet />;
};
