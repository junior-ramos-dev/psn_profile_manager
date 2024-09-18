/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";

import { IGame } from "@/models/interfaces";
import { IMG_PLACEHOLDER } from "@/settings/app/constants";
import { Box, Grid2, ListItem, Stack, Typography } from "@mui/material";

import { CustomProgressBar } from "../CustomProgressBar";
import { getTrophyIconByPlatfrom } from "../Playstation/PsPlatformIcon";
import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

interface IGameListItemDetailProps {
  game: IGame;
  gameIcon?: string;
}

const GameListItemDetailStats = ({ game }: IGameListItemDetailProps) => {
  return (
    <Stack
      key={`box-${game.npCommunicationId}`}
      direction="row"
      sx={{ alignItems: "center" }}
      spacing={1.8}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        Points: {game.earnedTrophiesPoints}/{game.definedTrophiesPoints}
      </Typography>
      &nbsp;&nbsp;
      <CustomProgressBar progress={game.progress} />
      &nbsp;&nbsp;
      <Grid2
        container
        spacing={1.2}
        justifyContent={"space-between"}
        sx={{ justifyItems: "right" }}
      >
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          <PsTrophyPlatinum />
          &nbsp;{game.earnedTrophies.platinum}
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          <PsTrophyGold />
          &nbsp;{game.earnedTrophies.gold}
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          <PsTrophySilver />
          &nbsp;{game.earnedTrophies.silver}
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          <PsTrophyBronze />
          &nbsp;{game.earnedTrophies.bronze}
        </Typography>
      </Grid2>
    </Stack>
  );
};

export const GameListItemDetail = ({
  game,
  gameIcon,
}: IGameListItemDetailProps) => {
  return (
    <ListItem
      key={`${game.npCommunicationId}-01`}
      sx={{ height: 40, alignItems: "center" }}
    >
      <Stack
        key={`box-${game.npCommunicationId}`}
        direction="row"
        sx={{ alignItems: "center" }}
        spacing={1}
      >
        <Image
          src={gameIcon ? `data:image/png;base64,${gameIcon}` : IMG_PLACEHOLDER}
          width={60}
          height={40}
          showLoading
        />
        <Typography variant="subtitle2">
          {getTrophyIconByPlatfrom(game.trophyTitlePlatform)}
        </Typography>
        &nbsp;
        <Typography variant="subtitle2">{game.trophyTitleName}</Typography>
      </Stack>
      <Box sx={{ flexGrow: 2 }} />
      <Box
        key={`${game.npCommunicationId}-02`}
        sx={{ height: 20, alignItems: "baseline", ml: 1, mb: 2 }}
      >
        <GameListItemDetailStats game={game} />
      </Box>
    </ListItem>
  );
};
