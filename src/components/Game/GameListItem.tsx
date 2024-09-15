/** @jsxImportSource @emotion/react */

import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { IGame, IGameRoute } from "@/models/interfaces";
import { selectGameById } from "@/services/rtkQueryApi/game/gameSelectors";
import { css } from "@emotion/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, Tooltip, useTheme } from "@mui/material";

import { GameListItemDetail } from "./GameListItemDetail";

interface IGameRouteItemProps {
  gameRoute: IGameRoute;
  gameIcon: string;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: IGameRoute) => void;
}

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

  const game: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameRoute.key)
  );

  const item = (
    <ListItemButton
      css={css`
        padding-left: ${nested ? 3 : 1};
        cursor: ${!gameRoute.enabled ? "not-allowed" : "auto"};
        color: ${!gameRoute.enabled ? theme.palette.text.secondary : "auto"};
      `}
      onClick={() => handleMenuClick(gameRoute)}
    >
      <GameListItemDetail
        game={game}
        gameIcon={gameIcon}
        isSelected={isSelected}
      />
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
