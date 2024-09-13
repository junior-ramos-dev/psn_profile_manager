/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material";

import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

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
        <PsTrophyPlatinum />
        &nbsp;{platinum}
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        <PsTrophyGold />
        &nbsp;{gold}
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        <PsTrophySilver />
        &nbsp;{silver}
      </Typography>
      &nbsp;
      <Typography variant="body2" sx={{ fontSize: 12 }}>
        <PsTrophyBronze />
        &nbsp;{bronze}
      </Typography>
    </Stack>
  );
};
