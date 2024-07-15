/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  useTheme,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { NavLink, useLocation } from "react-router-dom";

import { Game } from "../../models/Game";

interface GameItemProps {
  gameItem: Game;
  handleMenuClick?: (gameItem: Game) => void;
}

export const GameItem = ({
  gameItem,
  handleMenuClick = () => {},
}: GameItemProps) => {
  const location = useLocation();
  const theme = useTheme();

  const item = (
    <ListItemButton
      css={css`
        pl: 1;
        /* cursor: ${!route.enabled ? "not-allowed" : "auto"}; */
        /* color: ${!route.enabled ? theme.palette.text.secondary : "auto"}; */
      `}
      onClick={() => handleMenuClick(gameItem)}
    >
      <ListItemIcon>
        <IconButton
          size="small"
          css={css`
            box-shadow: ${isSelected
              ? `0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`
              : "default"};
            transition: "box-shadow 0.1s";
          `}
        >
          {route.icon && (
            <Icon
              component={route.icon}
              css={css`
                color: ${isSelected && theme.palette.primary.main};
              `}
            />
          )}
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={route.title} />
      {hasChildren && (route.expanded ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  return (
    <>
      <Image src={gameItem.trophyTitleIconUrl} width="50px" />
      {/* <Typography variant="body2">{gameItem.trophyTitleName}</Typography> */}
    </>
  );
};
