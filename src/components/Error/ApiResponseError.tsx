import { ReqValidationError } from "@/services/axios/axiosApiError";
import { Box } from "@mui/material";

import { StringWithExternalUrl } from "../StringWithExternalUrl";

import { ReqValidationErrorList } from "./ReqValidationErrorList";
import { StatusMessageError } from "./StatusMessageError";

interface ApiResponseErrorProps {
  errorStatus: number;
  errorMessage: string;
  errorDataName: string;
  errorDataMesssage: string;
  validationErrors: ReqValidationError[];
}

export const ApiResponseError = ({
  errorDataName,
  errorStatus,
  errorMessage,
  errorDataMesssage,
  validationErrors,
}: ApiResponseErrorProps) => (
  <Box>
    <StatusMessageError
      errorName={errorDataName}
      errorStatus={errorStatus}
      errorMessage={errorMessage}
    />
    <StringWithExternalUrl str={errorDataMesssage} />

    {validationErrors ? (
      <ReqValidationErrorList reqErrors={validationErrors} />
    ) : (
      <></>
    )}
  </Box>
);
