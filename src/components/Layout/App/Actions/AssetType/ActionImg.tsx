/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";

import { THEME_MODE } from "@/settings/app/theme/appTheme";
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
      color={theme.palette.mode === THEME_MODE.LIGHT ? "error" : "secondary"}
    >
      <Image src={imageUrl} width={30} height={30} showLoading />
    </Badge>
  ) : (
    <Image src={imageUrl} width={30} height={30} showLoading />
  );
};
