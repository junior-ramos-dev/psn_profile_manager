import React, { FC, ReactElement } from "react";
import clsx from "clsx";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import DefaultIcon from "@material-ui/icons/FileCopy";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { NavLink, useLocation } from "react-router-dom";

// models
import { GameRouteItem } from "./GameRouteItem";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      boxShadow:
        theme.palette.type === "light"
          ? "0 0 3px rgba(70,80,184,1), 0 0 9px rgba(70,80,184,1), 0 0 11px rgba(70,80,184,1), 0 0 30px rgba(70,80,184,1)"
          : "0 0 3px #fc5a8d, 0 0 9px #fc5a8d, 0 0 11px #fc5a8d, 0 0 30px #fc5a8d",
    },
    nested: {
      marginLeft: theme.spacing(2),
    },
    listItemDisabled: {
      cursor: "not-allowed",
    },
  })
);

// functional component
const GameItemNav = (gameRoute: GameRouteItem): ReactElement => {
  const classes = useStyles();
  const location: any = useLocation();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    if (!gameRoute.enabled) e.preventDefault();
  };

  return (
    <>
      <NavLink
        to={`${gameRoute.path}`}
        style={{ textDecoration: "none", color: "inherit" }}
        key={`${gameRoute.key}`}
        onClick={handleNavigate}
        className={clsx({
          [classes.listItemDisabled]: !gameRoute.enabled,
        })}
      >
        <Tooltip title={gameRoute.tooltip || ""} placement="right">
          <ListItem button disabled={!gameRoute.enabled}>
            <ListItemIcon>
              <IconButton
                className={clsx({
                  [classes.selected]: location.pathname === gameRoute.path,
                })}
                size="small"
              >
                <Icon component={gameRoute.icon || DefaultIcon} />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={gameRoute.title} />
          </ListItem>
        </Tooltip>
      </NavLink>
    </>
  );
};

export default GameItemNav;
