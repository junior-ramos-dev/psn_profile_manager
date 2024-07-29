import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "@/redux/auth";

export const DefaultRoute = () => {
  //TODO Check auth state with RTKQ
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  if (isLoggedIn) {
    return <Navigate replace to={"/"} />;
  }

  return <Outlet />;
};
