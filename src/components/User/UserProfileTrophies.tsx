/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material";

interface UserProfileTrophiesProps {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
}

export const UserProfileTrophies = ({
  platinum,
  gold,
  silver,
  bronze,
}: UserProfileTrophiesProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ mr: 1.8, justifyContent: "right" }}
    >
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        [P {platinum}]
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        [G {gold}]
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        [S {silver}]
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        [B {bronze}]
      </Typography>
    </Stack>
  );
};
