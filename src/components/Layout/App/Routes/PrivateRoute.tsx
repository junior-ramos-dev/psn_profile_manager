import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLoggedIn } from "@/services/rtkQueryApi/auth/authSelectors";

export const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? <Navigate replace to={"/auth/login"} /> : <Outlet />;
};
