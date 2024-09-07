/** @jsxImportSource @emotion/react */
import { Stack, Typography } from "@mui/material";

interface UserProfileIdAndNameProps {
  onlineId: string;
  firstName: string;
  lastName: string;
}

export const UserProfileIdAndName = ({
  onlineId,
  firstName,
  lastName,
}: UserProfileIdAndNameProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ mr: 1.8, justifyContent: "right" }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        {onlineId}
      </Typography>
      &nbsp;
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        [{firstName} {lastName}]
      </Typography>
    </Stack>
  );
};
