/** @jsxImportSource @emotion/react */
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface InfoBoxProps {
  message: string;
}

export const InfoBox = ({ message }: InfoBoxProps) => {
  return (
    <div style={{ width: "50%" }}>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          display: "block",
          p: 1,
          m: 1,
          bgcolor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          border: "1px solid",
          borderColor: theme.palette.info.main,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        })}
      >
        <Stack direction="row" spacing={1}>
          <InfoOutlinedIcon fontSize="medium" />
          <Typography variant="subtitle1" sx={{ fontSize: 14 }}>
            {message}
          </Typography>
        </Stack>
      </Box>
    </div>
  );
};
