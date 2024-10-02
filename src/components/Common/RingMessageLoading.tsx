import { RingLoader } from "react-spinners";

import { Box, Stack, Typography, useTheme } from "@mui/material";

export const RingMessageLoading = () => {
  const theme = useTheme();
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
        <Typography variant="subtitle2">
          Data will be available soon...
        </Typography>
      </Stack>
    </Box>
  );
};
