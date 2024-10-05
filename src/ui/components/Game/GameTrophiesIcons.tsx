/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material";

import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

interface IGameTrophiesIconsProps {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  progress: number;
}

export const GameTrophiesIcons = ({
  platinum,
  gold,
  silver,
  bronze,
  progress,
}: IGameTrophiesIconsProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ mr: 2, mt: 0.5, justifyContent: "left", alignItems: "baseline" }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophyPlatinum />
        &nbsp;&nbsp;{platinum}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophyGold />
        &nbsp;&nbsp;{gold}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophySilver />
        &nbsp;&nbsp;{silver}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        <PsTrophyBronze />
        &nbsp;&nbsp;{bronze}
      </Typography>
      &nbsp;•&nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        {progress}%
      </Typography>
    </Stack>
  );
};
