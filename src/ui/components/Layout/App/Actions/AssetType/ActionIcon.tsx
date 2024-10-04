/** @jsxImportSource @emotion/react */
import { ComponentType } from "react";

import { THEME_MODE } from "@/settings/app/theme/appTheme";
import { Badge, Icon, useTheme } from "@mui/material";

interface ActionIconProps {
  badgeContent?: number;
  icon: ComponentType;
}

export const ActionIcon = ({ badgeContent, icon }: ActionIconProps) => {
  const theme = useTheme();
  return badgeContent ? (
    <Badge
      badgeContent={badgeContent}
      color={theme.palette.mode === THEME_MODE.LIGHT ? "error" : "secondary"}
    >
      <Icon component={icon} />
    </Badge>
  ) : (
    <Icon component={icon} />
  );
};
