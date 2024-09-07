import { ComponentType } from "react";

import { IconButton, Tooltip, Typography } from "@mui/material";

import { ActionIcon } from "./ActionIcon";

interface ActionItemIconProps {
  title: string;
  icon?: ComponentType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  badgeContent?: number;
  disableTitle?: boolean;
  disableTooltip?: boolean;
}

export const ActionItemIcon = ({
  title,
  icon,
  onClick,
  badgeContent,
  disableTitle = false,
  disableTooltip = false,
}: ActionItemIconProps) => {
  const buttonIcon = (
    <IconButton size="large" color="inherit" onClick={onClick}>
      <ActionIcon badgeContent={badgeContent} icon={icon} />
      &nbsp;
      {disableTitle ? (
        <></>
      ) : (
        <Typography variant="body2" sx={{ fontSize: 14 }}>
          {title}
        </Typography>
      )}
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
