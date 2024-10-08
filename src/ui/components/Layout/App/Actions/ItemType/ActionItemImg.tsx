/** @jsxImportSource @emotion/react */
import { IconButton, Tooltip, Typography } from "@mui/material";

import { ActionImg } from "../AssetType/ActionImg";

interface ActionItemImgProps {
  title: string;
  imageUrl?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  badgeContent?: number;
  disableTitle?: boolean;
  disableTooltip?: boolean;
}

export const ActionItemImg = ({
  title,
  imageUrl,
  onClick,
  badgeContent,
  disableTitle = false,
  disableTooltip = false,
}: ActionItemImgProps) => {
  const buttonImg = (
    <IconButton size="small" color="inherit" onClick={onClick}>
      <ActionImg badgeContent={badgeContent} imageUrl={imageUrl} />
      &nbsp;
      {disableTitle ? (
        <></>
      ) : (
        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
          {title}
        </Typography>
      )}
    </IconButton>
  );

  return disableTooltip ? (
    buttonImg
  ) : (
    <Tooltip title={title} placement="bottom" arrow>
      {buttonImg}
    </Tooltip>
  );
};
