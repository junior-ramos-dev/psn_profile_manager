import { ComponentType } from "react";

import { IconButton, Tooltip } from "@mui/material";

import { ActionIcon } from "./ActionIcon";
import { ActionImg } from "./ActionImg";

interface ActionItemProps {
  title: string;
  icon?: ComponentType;
  imageUrl?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  badgeContent?: number;
  disableTooltip?: boolean;
}

export const ActionItem = ({
  title,
  icon,
  imageUrl,
  onClick,
  badgeContent,
  disableTooltip = false,
}: ActionItemProps) => {
  const buttonIcon = icon ? (
    <IconButton size="large" color="inherit" onClick={onClick}>
      <ActionIcon badgeContent={badgeContent} icon={icon} />
    </IconButton>
  ) : (
    <IconButton size="large" color="inherit" onClick={onClick}>
      <ActionImg badgeContent={badgeContent} imageUrl={imageUrl} />
    </IconButton>
  );

  return disableTooltip ? (
    buttonIcon
  ) : (
    <Tooltip title={title} placement="bottom" arrow>
      {buttonIcon}
    </Tooltip>
  );
};
