/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material";

interface UserProfileLevelProps {
  level: number;
  nextLevel?: number;
}

export const UserProfileLevel = ({ level }: UserProfileLevelProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ mr: 1.8, justifyContent: "right" }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        Level:
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        {level}
      </Typography>
      {/* &nbsp; &nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        Next Level:
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        {nextLevel}%
      </Typography> */}
    </Stack>
  );
};
