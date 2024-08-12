/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";
import { NavLink, useLocation } from "react-router-dom";

import { IGameRoute } from "@/models/interfaces";
import { IGameIcon } from "@/models/interfaces/games/IGameIcon";
import { css } from "@emotion/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  IconButton,
  lighten,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";

interface IGameRouteItemProps {
  gameRoute: IGameRoute;
  gameIcon: IGameIcon;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: IGameRoute) => void;
}

//TODO Edit list item details
export const GameListItem = ({
  gameRoute,
  gameIcon,
  nested = false,
  hasChildren = false,
  handleMenuClick = () => {},
}: IGameRouteItemProps) => {
  const location = useLocation();
  const theme = useTheme();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!gameRoute.enabled || hasChildren) e.preventDefault();
  };

  const isSelected =
    location.pathname === gameRoute.path ||
    (hasChildren &&
      gameRoute.subRoutes?.some((e) => location.pathname === e.path));

  const item = (
    <ListItemButton
      css={css`
        pl: ${nested ? 3 : 1};
        cursor: ${!gameRoute.enabled ? "not-allowed" : "auto"};
        color: ${!gameRoute.enabled ? theme.palette.text.secondary : "auto"};
      `}
      onClick={() => handleMenuClick(gameRoute)}
    >
      <ListItemIcon>
        <IconButton
          size="medium"
          css={css`
            box-shadow: ${isSelected
              ? `0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`
              : "default"};
            transition: "box-shadow 0.1s";
          `}
        >
          {/* <img src={`data:image/png;base64,${icon}`} /> */}
          <Image
            src={`data:image/png;base64,${gameIcon.iconBinaryData}`}
            width={60}
            height={40}
            showLoading
          />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={gameRoute.title} />
      {hasChildren && (gameRoute.expanded ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  return (
    <NavLink
      to={`${gameRoute.path}`}
      key={gameRoute.key}
      onClick={handleNavigate}
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    >
      {gameRoute.tooltip ? (
        <Tooltip
          title={`${gameRoute.tooltip}${!gameRoute.enabled ? " (Not Allowed)" : ""}`}
          placement="right"
        >
          {item}
        </Tooltip>
      ) : (
        item
      )}
    </NavLink>
  );
};
