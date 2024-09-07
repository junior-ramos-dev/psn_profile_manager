/** @jsxImportSource @emotion/react */

import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { Box, Stack } from "@mui/material";

import { UserProfileIdAndName } from "./UserProfileIdAndName";
import { UserProfileLevel } from "./UserProfileLevel";
import { UserProfileTrophies } from "./UserProfileTrophies";

interface IUserProfileDetailProps {
  userProfile: IUserProfile;
}

export const UserProfileDetail = ({ userProfile }: IUserProfileDetailProps) => {
  const trophySummary = userProfile.trophySummary;
  const level = trophySummary.level;
  const progress = trophySummary.progress;
  const earnedTrophies = trophySummary.earnedTrophies;

  return (
    <Stack spacing={0.5}>
      <Box
        key={`${userProfile.userId}-01`}
        sx={{ height: 10, alignItems: "center" }}
      >
        <UserProfileIdAndName
          onlineId={userProfile.onlineId}
          firstName={userProfile.personalDetail.firstName}
          lastName={userProfile.personalDetail.lastName}
        />
      </Box>
      <Box
        key={`${userProfile.userId}-02`}
        sx={{ height: 10, alignItems: "baseline", ml: 1, mb: 2 }}
      >
        <UserProfileLevel level={level} nextLevel={progress} />
      </Box>
      <Box
        key={`${userProfile.userId}-03`}
        sx={{ height: 10, alignItems: "baseline", ml: 1, mb: 2 }}
      >
        <UserProfileTrophies
          platinum={earnedTrophies.platinum}
          gold={earnedTrophies.gold}
          silver={earnedTrophies.silver}
          bronze={earnedTrophies.bronze}
        />
      </Box>
    </Stack>
  );
};
