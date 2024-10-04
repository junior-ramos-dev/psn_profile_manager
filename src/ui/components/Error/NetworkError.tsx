/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";

import { StatusMessageError } from "./StatusMessageError";

interface NetworkErrorProps {
  errorStatus: number;
  errorMessage: string;
}

export const NetworkError = ({
  errorStatus,
  errorMessage,
}: NetworkErrorProps) => (
  <Box>
    <StatusMessageError
      errorName="NETWORK ERROR"
      errorStatus={errorStatus}
      errorMessage={errorMessage}
    />
  </Box>
);
