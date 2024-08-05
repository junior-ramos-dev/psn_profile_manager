/** @jsxImportSource @emotion/react */
import { NavLink, useLocation } from "react-router-dom";

import { IRouteItem } from "@/models/interfaces";
import { css } from "@emotion/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Icon,
  IconButton,
  lighten,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";

interface SidebarItemProps {
  route: IRouteItem;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: IRouteItem) => void;
}

export const SidebarItem = ({
  route,
  nested = false,
  hasChildren = false,
  handleMenuClick = () => {},
}: SidebarItemProps) => {
  const location = useLocation();
  const theme = useTheme();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!route.enabled || hasChildren) e.preventDefault();
  };

  const isSelected =
    location.pathname === route.path ||
    (hasChildren && route.subRoutes?.some((e) => location.pathname === e.path));

  const item = (
    <ListItemButton
      css={css`
        pl: ${nested ? 3 : 1};
        cursor: ${!route.enabled ? "not-allowed" : "auto"};
        color: ${!route.enabled ? theme.palette.text.secondary : "auto"};
      `}
      onClick={() => handleMenuClick(route)}
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
          {route.asset && (
            <Icon
              component={route.asset}
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
    <NavLink
      to={`${route.path}`}
      key={route.key}
      onClick={handleNavigate}
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    >
      {route.tooltip ? (
        <Tooltip
          title={`${route.tooltip}${!route.enabled ? " (Not Allowed)" : ""}`}
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
