/** @jsxImportSource @emotion/react */

import { ITrophyCount } from "@/models/interfaces/trophy/ITrophy";
import { List, ListItem } from "@mui/material";

interface TrophyEarnedItemProps {
  trophies: ITrophyCount;
  // handleMenuClick?: (gameItem: Game) => void;
}

export const TrophyEarnedItem = ({
  trophies,
  // handleMenuClick = () => {},
}: TrophyEarnedItemProps) => {
  return (
    <List component="div" disablePadding>
      <ListItem key={1}>Platinum: {trophies.platinum}</ListItem>
      <ListItem key={2}>Gold: {trophies.gold}</ListItem>
      <ListItem key={3}>Silver: {trophies.silver}</ListItem>
      <ListItem key={4}>Bronze: {trophies.bronze}</ListItem>
    </List>
  );
};
