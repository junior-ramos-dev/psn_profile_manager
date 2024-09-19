/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";

import { IGame } from "@/models/interfaces";
import { IMG_PLACEHOLDER } from "@/settings/app/constants";
import { Box, ListItem, Stack, Typography } from "@mui/material";
import { BoxProps } from "@mui/material/Box";

import { CustomProgressBar } from "../CustomProgressBar";
import { getTrophyIconByPlatfrom } from "../Playstation/PsPlatformIcon";
import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

function PointsItem(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (/*theme*/) => ({
          border: "1px solid",
          borderColor: "grey.500",
          p: 1,
          m: 1,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "135px",
          // bgcolor: "#fff",
          // color: "grey.800",
          // fontSize: "0.875rem",
          // fontWeight: "700",
          // ...theme.applyStyles("dark", {
          //   bgcolor: "#101010",
          //   color: "grey.300",
          //   borderColor: "grey.800",
          // }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

function ProgressItem(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (/*theme*/) => ({
          border: "1px solid",
          borderColor: "grey.500",
          p: 1,
          m: 1,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "120px",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

function TrophyItem(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (/*theme*/) => ({
          border: "1px solid",
          borderColor: "grey.500",
          p: 1,
          m: 1,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "50px",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

interface IGameListItemDetailProps {
  game: IGame;
  gameIcon?: string;
}

const GameListItemDetailStats = ({ game }: IGameListItemDetailProps) => {
  return (
    <>
      <div style={{ width: "400px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            // justifyItems: "right",
            justifyContent: "center",
          }}
        >
          <PointsItem>
            <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
              Points: {game.earnedTrophiesPoints}/{game.definedTrophiesPoints}
            </Typography>
          </PointsItem>
          <ProgressItem>
            <CustomProgressBar progress={game.progress} />
          </ProgressItem>
        </Box>
      </div>
      <div style={{ width: "200px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 0.5fr)",
            // justifyItems: "right",
            justifyContent: "end",
          }}
        >
          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophyPlatinum />
              &nbsp;{game.earnedTrophies.platinum}
            </Typography>
          </TrophyItem>

          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophyGold />
              &nbsp;{game.earnedTrophies.gold}
            </Typography>
          </TrophyItem>

          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophySilver />
              &nbsp;{game.earnedTrophies.silver}
            </Typography>
          </TrophyItem>
          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophyBronze />
              &nbsp;{game.earnedTrophies.bronze}
            </Typography>
          </TrophyItem>
        </Box>
      </div>
    </>
  );
};

export const GameListItemDetail = ({
  game,
  gameIcon,
}: IGameListItemDetailProps) => {
  return (
    <ListItem
      key={`${game.npCommunicationId}-01`}
      sx={{ height: 40, alignItems: "center", justifyContent: "start" }}
    >
      <Stack
        key={`box-${game.npCommunicationId}`}
        direction="row"
        sx={{ alignItems: "center", justifyContent: "start" }}
        spacing={1}
      >
        <Image
          src={gameIcon ? `data:image/png;base64,${gameIcon}` : IMG_PLACEHOLDER}
          width={60}
          height={40}
          showLoading
          style={{ borderRadius: "5px" }}
        />
        {getTrophyIconByPlatfrom(game.trophyTitlePlatform)}
        &nbsp;
        <Typography variant="subtitle2">{game.trophyTitleName}</Typography>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <GameListItemDetailStats game={game} />
    </ListItem>
  );
};
