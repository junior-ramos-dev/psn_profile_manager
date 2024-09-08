/** @jsxImportSource @emotion/react */
import { ComponentType } from "react";

import { LIGHT_MODE_THEME } from "@/settings/app/constants";
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
      color={theme.palette.mode === LIGHT_MODE_THEME ? "error" : "secondary"}
    >
      <Icon component={icon} />
    </Badge>
  ) : (
    <Icon component={icon} />
  );
};
