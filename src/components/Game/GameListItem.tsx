/** @jsxImportSource @emotion/react */

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { IGame, IGameRoute } from "@/models/interfaces";
import { selectGameById } from "@/services/rtkQueryApi/game/gameSelectors";
import { css } from "@emotion/react";
import { ListItemButton, Tooltip, useTheme } from "@mui/material";

import { GameListItemDetail } from "./GameListItemDetail";

interface IGameRouteItemProps {
  gameRoute: IGameRoute;
  gameIcon: string;
  hasChildren?: boolean;
  handleMenuClick?: (route: IGameRoute) => void;
}

export const GameListItem = ({
  gameRoute,
  gameIcon,
  hasChildren = false,
  handleMenuClick = () => {},
}: IGameRouteItemProps) => {
  const theme = useTheme();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!gameRoute.enabled || hasChildren) e.preventDefault();
  };

  const game: IGame = useSelector((gamesList) =>
    selectGameById(gamesList, gameRoute.key)
  );

  const item = (
    <ListItemButton
      css={css`
        cursor: ${!gameRoute.enabled ? "not-allowed" : "auto"};
        color: ${!gameRoute.enabled ? theme.palette.text.secondary : "auto"};
      `}
      onClick={() => handleMenuClick(gameRoute)}
    >
      <GameListItemDetail game={game} gameIcon={gameIcon} />
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
