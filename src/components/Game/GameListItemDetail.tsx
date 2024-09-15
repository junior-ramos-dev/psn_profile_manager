/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";

import { IGame } from "@/models/interfaces";
import { IMG_PLACEHOLDER } from "@/settings/app/constants";
import { css } from "@emotion/react";
import {
  Box,
  IconButton,
  lighten,
  ListItem,
  ListItemIcon,
  Typography,
  useTheme,
} from "@mui/material";

import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

interface IGameListItemDetailProps {
  game: IGame;
  gameIcon: string;
  isSelected?: boolean;
}

export const GameListItemDetail = ({
  game,
  gameIcon,
  isSelected,
}: IGameListItemDetailProps) => {
  const theme = useTheme();

  return (
    <Box key={`box-${game.npCommunicationId}`} sx={{ alignItems: "baseline" }}>
      <ListItem
        key={`${game.npCommunicationId}-01`}
        sx={{ height: 40, alignItems: "center" }}
      >
        <ListItemIcon>
          <IconButton
            size="medium"
            css={css`
              box-shadow: ${isSelected
                ? `0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`
                : "default"};
              transition: "box-shadow 0.1s";
            `}
          >
            {/* <img src={`data:image/png;base64,${icon}`} /> */}
            <Image
              src={
                gameIcon ? `data:image/png;base64,${gameIcon}` : IMG_PLACEHOLDER
              }
              width={60}
              height={40}
              showLoading
            />
          </IconButton>
        </ListItemIcon>
        <Typography variant="subtitle2">
          [{game.trophyTitlePlatform}]
        </Typography>
        &nbsp;
        <Typography variant="subtitle2">{game.trophyTitleName}</Typography>
      </ListItem>
      <ListItem
        key={`${game.npCommunicationId}-02`}
        sx={{ height: 20, alignItems: "baseline", ml: 1, mb: 2 }}
      >
        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
          Progress:
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          {game.progress}%
        </Typography>
        &nbsp; &nbsp;
        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
          Points: {game.earnedTrophiesPoints}/{game.definedTrophiesPoints}
        </Typography>
        &nbsp;
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
      </ListItem>
    </Box>
  );
};
