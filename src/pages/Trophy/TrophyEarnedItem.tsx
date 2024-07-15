/** @jsxImportSource @emotion/react */
import { useTheme } from "@mui/material";
import Image from "mui-image";
import { NavLink, useLocation } from "react-router-dom";
import { List, ListItem } from "@mui/material";

import { Typography } from "@mui/material";

import { TrophyCount } from "../../models/types/trophy/TrophyCount";

interface TrophyEarnedItemProps {
  trophies: TrophyCount;
  // handleMenuClick?: (gameItem: Game) => void;
}

export const TrophyEarnedItem = ({
  trophies,
  // handleMenuClick = () => {},
}: TrophyEarnedItemProps) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <List component="div" disablePadding>
      <ListItem key={1}>Platinum: {trophies.platinum}</ListItem>
      <ListItem key={2}>Gold: {trophies.gold}</ListItem>
      <ListItem key={3}>Silver: {trophies.silver}</ListItem>
      <ListItem key={4}>Bronze: {trophies.bronze}</ListItem>
    </List>
  );
};
