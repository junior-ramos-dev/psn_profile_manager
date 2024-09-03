import { Typography } from "@mui/material";

interface ErrorStatusMessageProps {
  errorName: string;
  errorStatus: number;
  errorMessage: string;
}

export const ErrorStatusMessage = ({
  errorName,
  errorStatus,
  errorMessage,
}: ErrorStatusMessageProps) => {
  const statusMessage = `${errorName} - Status: ${errorStatus} - ${errorMessage}`;

  return (
    <Typography variant="subtitle2" color="error">
      {statusMessage}
    </Typography>
  );
};
