import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

const RouteError = () => {
  const navigate = useNavigate();
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

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div
      id="error-page"
      className="flex flex-col gap-8 justify-center items-center h-screen"
    >
      <Box sx={{ mt: 8, ml: 3 }}>
        <Typography variant="h6">Oops!</Typography>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Sorry, an unexpected error has occurred. (
            <p className="text-slate-400">
              <i>{errorMessage}</i>
            </p>
            )
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 3, mb: 2, width: 100 }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 3, mt: 3, mb: 2, width: 100 }}
            onClick={refreshPage}
          >
            Reload
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default RouteError;
