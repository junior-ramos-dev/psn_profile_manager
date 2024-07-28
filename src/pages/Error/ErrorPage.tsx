import { Box } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Box sx={{ mt: 4, ml: 4 }}>
        <h2>Oops!</h2>
        <Box sx={{ p: 2 }}>
          Sorry, an unexpected error has occurred.
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </Box>
      </Box>
    </div>
  );
};
