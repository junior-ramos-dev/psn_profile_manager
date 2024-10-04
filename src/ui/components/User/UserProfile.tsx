/** @jsxImportSource @emotion/react */

import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { Box } from "@mui/material";

import { UserProfileDetail } from "./UserProfileDetail";
import { UserProfileImg } from "./UserProfileImg";

interface IUserProfileProps {
  userProfile: IUserProfile;
}

export const UserProfile = ({ userProfile }: IUserProfileProps) => {
  const imgUrl = userProfile.avatarUrls[0].avatarUrl;

  return (
    <Box key={`box-${userProfile.userId}`} sx={{ alignItems: "baseline" }}>
      <UserProfileImg imgUrl={imgUrl} />
      <UserProfileDetail userProfile={userProfile} />
    </Box>
  );
};
