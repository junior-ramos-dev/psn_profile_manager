import { useLocation, useNavigate } from "react-router-dom";

import { StringWithExternalUrl } from "@/components/StringWithExternalUrl";
import { Box, Button, Typography } from "@mui/material";

import { ErrorStatusMessage } from "../ErrorStatusMessage";

import { ReqValidationErrorList } from "./ReqValidationErrorList";

export const AxiosErrorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const { axiosApiError } = state; // Read values passed on state

  const validationErrors = axiosApiError.data.errors;

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
            Sorry, an unexpected error has occurred.
          </Typography>
          {
            <Box>
              <ErrorStatusMessage
                errorName={axiosApiError.data.name}
                errorStatus={axiosApiError.status}
                errorMessage={axiosApiError.message}
              />
              <StringWithExternalUrl str={axiosApiError.data.message} />

              {validationErrors ? (
                <ReqValidationErrorList reqErrors={validationErrors} />
              ) : (
                <></>
              )}
            </Box>
          }
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
