import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/temp/redux-hooks";
import { useSelector } from "react-redux";
import { authSelectors } from "@/redux/auth";

export const ProtectedRoute = () => {
  //TODO Check auth state with RTKQ
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  if (!isLoggedIn) {
    return <Navigate replace to={"/auth/login"} />;
  }

  return <Outlet />;
};
