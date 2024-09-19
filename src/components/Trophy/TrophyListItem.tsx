/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Image } from "mui-image";
import { useLocation } from "react-router-dom";

import { ITrophyRouteWithTrophy } from "@/models/interfaces";
import { css } from "@emotion/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  IconButton,
  lighten,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { getTrophyIconByType } from "../Playstation/PsTrophyIcon";

interface ITrophyRouteItemProps {
  trophyRoute: ITrophyRouteWithTrophy;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: ITrophyRouteWithTrophy) => void;
}

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

  const trophy = trophyRoute.trophy;

  const [checkBox, setCheckBox] = useState(false);

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(event.currentTarget.checked);
  };

  const thophyListItem = (
    <ListItem
      css={css`
        padding-left: ${nested ? 3 : 1};
        cursor: ${!trophyRoute.enabled ? "not-allowed" : "auto"};
        color: ${!trophyRoute.enabled ? theme.palette.text.secondary : "auto"};
        background-color: ${checkBox ? "#282d23" : "#3a3a3a"};
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
          <Image
            src={trophy.trophyIconUrl}
            width={30}
            height={30}
            showLoading
          />
        </IconButton>
      </ListItemIcon>
      <Stack spacing={1.5}>
        <Box
          key={`${trophy.trophyName}-01`}
          sx={{ height: 10, alignItems: "baseline", ml: 1, mb: 2 }}
        >
          <Typography variant="subtitle2">{trophy.trophyName}</Typography>
        </Box>
        <Box
          key={`${trophy.trophyName}-02`}
          sx={{ height: 10, alignItems: "baseline", ml: 1, mb: 2 }}
        >
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            {trophy.trophyDetail}
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        key={`${trophy.trophyName}-02`}
        sx={{ height: 10, alignItems: "baseline", ml: 1, mb: 2 }}
      >
        <Stack direction="row" spacing={0.1}>
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            Rarity: {trophy.rarity}
          </Typography>
          &nbsp;
          <Typography variant="body2" sx={{ fontSize: 12 }}>
            Earned Rate: {trophy.trophyEarnedRate}
          </Typography>
          {trophy.isEarned ? (
            <Box
              key={`${trophy.trophyName}-00`}
              sx={{
                height: 14,
                alignItems: "baseline",
                mr: 1,
                mt: 1,
              }}
            >
              {getTrophyIconByType(trophy.trophyType, 18, 24)}
            </Box>
          ) : (
            <Checkbox checked={checkBox} onChange={handleCheckbox} />
          )}
        </Stack>
      </Box>
      {hasChildren && (trophyRoute.expanded ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  );

  return thophyListItem;
};
