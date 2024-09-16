/** @jsxImportSource @emotion/react */

import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { Stack } from "@mui/material";

import { UserProfileIdAndName } from "./UserProfileIdAndName";
import { UserProfileTrophies } from "./UserProfileTrophies";

interface IUserProfileDetailHeaderProps {
  userProfile: IUserProfile;
}

export const UserProfileDetailHeader = ({
  userProfile,
}: IUserProfileDetailHeaderProps) => {
  const trophySummary = userProfile.trophySummary;
  const level = trophySummary.level;
  const earnedTrophies = trophySummary.earnedTrophies;

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        mt: 0.5,
        ml: 1,
        justifyContent: "right",
        alignItems: "baseline",
      }}
    >
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
