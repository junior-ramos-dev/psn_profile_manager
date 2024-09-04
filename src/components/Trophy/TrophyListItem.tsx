/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";
import { NavLink, useLocation } from "react-router-dom";

import { ITrophyRoute } from "@/models/interfaces";
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

interface ITrophyRouteItemProps {
  trophyRoute: ITrophyRoute;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: ITrophyRoute) => void;
}

//TODO Edit list item details
export const TrophyListItem = ({
  trophyRoute,
  nested = false,
  hasChildren = false,
  handleMenuClick = () => {},
}: ITrophyRouteItemProps) => {
  const location = useLocation();
  const theme = useTheme();

  const isSelected =
    location.pathname === trophyRoute.path ||
    (hasChildren &&
      trophyRoute.subRoutes?.some((e) => location.pathname === e.path));

  const item = (
    <ListItemButton
      css={css`
        padding-left: ${nested ? 3 : 1};
        cursor: ${!trophyRoute.enabled ? "not-allowed" : "auto"};
        color: ${!trophyRoute.enabled ? theme.palette.text.secondary : "auto"};
      `}
      onClick={() => handleMenuClick(trophyRoute)}
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
          <Image src={""} width={30} height={30} showLoading />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={trophyRoute.title} />
      {hasChildren && (trophyRoute.expanded ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  return (
    <NavLink
      to={`${trophyRoute.path}`}
      key={trophyRoute.key}
      // onClick={handleNavigate}
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    >
      {trophyRoute.tooltip ? (
        <Tooltip
          title={`${trophyRoute.tooltip}${!trophyRoute.enabled ? " (Not Allowed)" : ""}`}
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
