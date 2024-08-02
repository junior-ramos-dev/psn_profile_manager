import useNetworkStatus from "@/hooks/useNetworkStatus";
import { Box } from "@mui/material";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  // you don't need to explicitly set error to `unknown`
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  console.error(error);

  const { isOnline } = useNetworkStatus();

  return (
    <div
      id="error-page"
      className="flex flex-col gap-8 justify-center items-center h-screen"
    >
      <Box sx={{ mt: 4, ml: 4 }}>
        <h2 className="text-4xl font-bold">Oops!</h2>
        <Box sx={{ p: 2 }}>
          Sorry, an unexpected error has occurred.
          {!isOnline ? (
            <p className="text-slate-400">
              <i>Offline: No Internet connection</i>
            </p>
          ) : (
            <p className="text-slate-400">
              <i>{errorMessage}</i>
            </p>
          )}
        </Box>
      </Box>
    </div>
  );
};
