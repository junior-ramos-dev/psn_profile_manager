import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux-hooks";

export const DefaultRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (basicUserInfo) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
