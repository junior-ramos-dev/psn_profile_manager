/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material";

import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyLevel,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

interface UserProfileTrophiesProps {
  level: number;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
}

export const UserProfileTrophies = ({
  level,
  platinum,
  gold,
  silver,
  bronze,
}: UserProfileTrophiesProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ mr: 1.8, mt: 0.5, justifyContent: "right", alignItems: "baseline" }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
        <PsTrophyLevel />
        &nbsp;&nbsp;{level}
      </Typography>
      &nbsp;{"]["}&nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophyPlatinum />
        &nbsp;&nbsp;{platinum}
      </Typography>
      &nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophyGold />
        &nbsp;&nbsp;{gold}
      </Typography>
      &nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophySilver />
        &nbsp;&nbsp;{silver}
      </Typography>
      &nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophyBronze />
        &nbsp;&nbsp;{bronze}
      </Typography>
    </Stack>
  );
};
