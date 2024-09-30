/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Image } from "mui-image";
import { useLocation } from "react-router-dom";

import { ITrophyRouteExtended } from "@/models/interfaces";
import { useSetTrophyIsCheckedMutation } from "@/services/rtkQueryApi/trophy/trophyApi";
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
  trophyRoute: ITrophyRouteExtended;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: ITrophyRouteExtended) => void;
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

  const [checkBox, setCheckBox] = useState(trophy.isChecked);

  const [setTrophyIsChecked] = useSetTrophyIsCheckedMutation();

  useEffect(() => {
    setCheckBox(trophy.isChecked);
  }, [trophy.isChecked]);

  const handleSetTrophyIsChecked = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const npCommunicationId = trophyRoute.npCommunicationId;
    const trophyTitlePlatform = trophyRoute.trophyTitlePlatform;
    const trophyGroupId = trophy.groupId;
    const trophyId = trophy.trophyId;
    const isChecked = event.currentTarget.checked;

    setCheckBox(event.currentTarget.checked);

    try {
      const urlParams = { npCommunicationId, trophyTitlePlatform };
      const body = { trophyGroupId, trophyId, isChecked };

      await setTrophyIsChecked({
        urlParams,
        body,
      })
        .unwrap()
        .then((data) => {
          console.log(data);
        });
    } catch (e) {
      console.error(e);
    }
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
            <Checkbox checked={checkBox} onChange={handleSetTrophyIsChecked} />
          )}
        </Stack>
      </Box>
      {hasChildren && (trophyRoute.expanded ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  );

  return thophyListItem;
};
