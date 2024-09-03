import { Box } from "@mui/material";

import { ErrorStatusMessage } from "./ErrorStatusMessage";

interface NetworkErrorProps {
  errorStatus: number;
  errorMessage: string;
}

export const NetworkError = ({
  errorStatus,
  errorMessage,
}: NetworkErrorProps) => (
  <Box>
    <ErrorStatusMessage
      errorName="NETWORK ERROR"
      errorStatus={errorStatus}
      errorMessage={errorMessage}
    />
  </Box>
);
