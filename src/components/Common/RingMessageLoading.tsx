import { RingLoader } from "react-spinners";

import { Box, Stack, Typography, useTheme } from "@mui/material";

interface IRingMessageLoadingProps {
  message?: string;
}

export const RingMessageLoading = ({ message }: IRingMessageLoadingProps) => {
  const theme = useTheme();

  const displayMessage: string = message ?? "Data will be available soon...";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "60vh",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <RingLoader color={theme.palette.primary.main} />
        <Typography
          variant="subtitle2"
          style={{ wordWrap: "break-word" }}
          display="block"
        >
          {displayMessage}
        </Typography>
      </Stack>
    </Box>
  );
};
