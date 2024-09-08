import { Image } from "mui-image";

import { LIGHT_MODE_THEME } from "@/settings/app/constants";
import { Badge, useTheme } from "@mui/material";

interface ActionImgProps {
  badgeContent?: number;
  imageUrl: string;
}

export const ActionImg = ({ badgeContent, imageUrl }: ActionImgProps) => {
  const theme = useTheme();
  return badgeContent ? (
    <Badge
      badgeContent={badgeContent}
      color={theme.palette.mode === LIGHT_MODE_THEME ? "error" : "secondary"}
    >
      <Image src={imageUrl} width={30} height={30} showLoading />
    </Badge>
  ) : (
    <Image src={imageUrl} width={30} height={30} showLoading />
  );
};
