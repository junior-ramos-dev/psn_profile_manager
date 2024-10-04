/** @jsxImportSource @emotion/react */

import { Image } from "mui-image";

import {
  getTrophiesTotalPoints,
  IDefinedGroupInfo,
  IEarnedGroupInfo,
} from "@/models/interfaces/trophy/ITrophy";
import { IMG_PLACEHOLDER } from "@/settings/app/constants";
import { Box, ListItem, Stack, Typography } from "@mui/material";

import { PointsItem, ProgressItem, TrophyItem } from "../Common/BoxGridItems";
import { CustomProgressBar } from "../CustomProgressBar";
import {
  PsTrophyBronze,
  PsTrophyGold,
  PsTrophyPlatinum,
  PsTrophySilver,
} from "../Playstation/PsTrophyIcon";

interface ITrophyGroupDetailProps {
  definedGroupInfo: IDefinedGroupInfo;
  earnedGroupInfo: IEarnedGroupInfo;
}

const TrophyGroupDetailStats = ({
  definedGroupInfo,
  earnedGroupInfo,
}: ITrophyGroupDetailProps) => {
  const totalDefinedPoints = getTrophiesTotalPoints(
    definedGroupInfo.definedTrophies
  );
  const totalEarnedPoints = getTrophiesTotalPoints(
    earnedGroupInfo.earnedTrophies
  );

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
              Points: {totalEarnedPoints}/{totalDefinedPoints}
            </Typography>
          </PointsItem>
          <ProgressItem>
            <CustomProgressBar progress={earnedGroupInfo.progress} />
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
              &nbsp;{earnedGroupInfo.earnedTrophies.platinum}
            </Typography>
          </TrophyItem>

          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophyGold />
              &nbsp;{earnedGroupInfo.earnedTrophies.gold}
            </Typography>
          </TrophyItem>

          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophySilver />
              &nbsp;{earnedGroupInfo.earnedTrophies.silver}
            </Typography>
          </TrophyItem>
          <TrophyItem>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <PsTrophyBronze />
              &nbsp;{earnedGroupInfo.earnedTrophies.bronze}
            </Typography>
          </TrophyItem>
        </Box>
      </div>
    </>
  );
};

export const TrophyGroupDetail = ({
  definedGroupInfo,
  earnedGroupInfo,
}: ITrophyGroupDetailProps) => {
  return (
    <ListItem
      key={`${definedGroupInfo.trophyGroupName}`}
      sx={{
        height: 50,
        alignItems: "center",
        justifyContent: "start",
        mt: 1,
        mb: 1,
      }}
    >
      <Stack
        key={`box-${definedGroupInfo.trophyGroupName}`}
        direction="row"
        sx={{ alignItems: "center", justifyContent: "start" }}
        spacing={1}
      >
        <Image
          src={definedGroupInfo.trophyGroupIconUrl ?? IMG_PLACEHOLDER}
          width={60}
          height={40}
          showLoading
          style={{ borderRadius: "5px" }}
        />
        <Typography variant="subtitle2">
          {definedGroupInfo.trophyGroupName}
        </Typography>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <TrophyGroupDetailStats
        definedGroupInfo={definedGroupInfo}
        earnedGroupInfo={earnedGroupInfo}
      />
    </ListItem>
  );
};
