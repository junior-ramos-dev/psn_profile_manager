/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from "react-router-dom";

import { ApiResponseError } from "@/ui/components/Error/ApiResponseError";
import { NetworkError } from "@/ui/components/Error/NetworkError";
import { Box, Button, Typography } from "@mui/material";

const AxiosError = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { axiosApiError } = state; // Read values passed on state
  console.log(axiosApiError);

  const errorStatus = axiosApiError.status;
  const errorMessage = axiosApiError.message;

  let errorData;
  let validationErrors;
  let errorDataName;
  let errorDataMesssage;

  if (axiosApiError.data) {
    errorData = axiosApiError.data;
    validationErrors = errorData.errors;
    errorDataName = errorData.name;
    errorDataMesssage = errorData.message;
  }

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
          {errorData ? (
            <ApiResponseError
              errorDataName={errorDataName}
              errorStatus={errorStatus}
              errorMessage={errorMessage}
              errorDataMesssage={errorDataMesssage}
              validationErrors={validationErrors}
            />
          ) : (
            <NetworkError
              errorStatus={errorStatus}
              errorMessage={errorMessage}
            />
          )}
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

export default AxiosError;
