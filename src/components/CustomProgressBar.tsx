/** @jsxImportSource @emotion/react */
import { LinearProgress, Stack, Typography } from "@mui/material";

interface ICustomProgressBarProps {
  progress: number;
}

export const CustomProgressBar = ({ progress }: ICustomProgressBarProps) => {
  return (
    <Stack spacing={-1}>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: 11 }}
        style={{
          width: "100px",
          height: "10px",
          textAlign: "center",
        }}
      >
        {progress}%
      </Typography>
      <LinearProgress
        variant="determinate"
        style={{
          width: "100px",
          height: "14px",
          borderRadius: "6px",
          zIndex: -1,
        }}
        sx={{
          "& .MuiLinearProgress-bar": {
            borderRadius: "6px",
          },
          "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: "#888",
          },
          "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "#1971e3",
          },
        }}
        value={progress}
      />
    </Stack>
  );
};
