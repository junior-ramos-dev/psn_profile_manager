/** @jsxImportSource @emotion/react */

import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { Stack } from "@mui/material";

import { UserProfileIdAndName } from "./UserProfileIdAndName";
import { UserProfileTrophies } from "./UserProfileTrophies";

interface IUserProfileDetailProps {
  userProfile: IUserProfile;
}

export const UserProfileDetail = ({ userProfile }: IUserProfileDetailProps) => {
  const trophySummary = userProfile.trophySummary;
  const level = trophySummary.level;
  const earnedTrophies = trophySummary.earnedTrophies;

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        mr: 1.8,
        ml: 1,
        mb: 2,
        justifyContent: "left",
        alignItems: "baseline",
      }}
    >
      &nbsp;{"["}&nbsp;
      <UserProfileTrophies
        level={level}
        platinum={earnedTrophies.platinum}
        gold={earnedTrophies.gold}
        silver={earnedTrophies.silver}
        bronze={earnedTrophies.bronze}
      />
      &nbsp;{"]["}&nbsp;
      <UserProfileIdAndName
        onlineId={userProfile.onlineId}
        // firstName={userProfile.personalDetail.firstName}
        // lastName={userProfile.personalDetail.lastName}
      />
      &nbsp;{"]["}&nbsp;
    </Stack>
  );
};
