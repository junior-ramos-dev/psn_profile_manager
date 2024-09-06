/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";

import { IGame } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
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

interface IGameListItemDetailProps {
  game: IGame;
  gameIcon: IGameIcon;
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
              src={`data:image/webp;base64,${gameIcon.iconBinWebp}`}
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
          Trophies:
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          [Platinum {game.earnedTrophies.platinum}]
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          [Gold {game.earnedTrophies.gold}]
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          [Silver {game.earnedTrophies.silver}]
        </Typography>
        &nbsp;
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          [Bronze {game.earnedTrophies.bronze}]
        </Typography>
      </ListItem>
    </Box>
  );
};
