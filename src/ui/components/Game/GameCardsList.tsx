/** @jsxImportSource @emotion/react */
import dayjs from "dayjs";
import { Image } from "mui-image";
import { NavLink } from "react-router-dom";

import { IGameDetailsList } from "@/models/interfaces/games/IGame";
import { IMG_PLACEHOLDER } from "@/settings/app/constants";
import { StringUtils } from "@/utils/strings";
import { css, Divider, Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { GameTrophiesIcons } from "./GameTrophiesIcons";

interface GameCardListProps {
  data: IGameDetailsList[];
  totalItems: number;
  isLoading?: boolean;
}

export const GameCardsList = ({
  data,
  isLoading,
  totalItems,
}: GameCardListProps) => {
  const skeletonArray = Array.from(new Array(totalItems).keys());

  return (
    <Grid2
      container
      // wrap="nowrap"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ mt: 2 }}
    >
      {!isLoading
        ? data.map((item, index) => (
            <NavLink
              to={`/game/${item.usergame.npCommunicationId}`}
              key={item.usergame.npCommunicationId}
              // onClick={handleNavigate}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <Box
                key={item.usergame.npCommunicationId + index}
                display="flex"
                flexDirection="column"
                alignItems="left"
                justifyContent="left"
                margin="auto"
                sx={{
                  width: 250,
                  height: 230,
                  ml: 2,
                  my: 0.5,
                  border: "1px solid",
                  borderRadius: "5px",
                  borderColor: "#acacac",
                }}
              >
                <Box sx={{ pr: 1 }}>
                  <Image
                    src={item.usergame.trophyTitleIconUrl ?? IMG_PLACEHOLDER}
                    showLoading
                    style={{
                      width: 248,
                      height: 150,
                      // border: "1px solid",
                      // borderColor: "#8a8a8a",
                      borderRadius: "3px",
                    }}
                  />
                </Box>
                <Divider />
                <Box sx={{ mt: 0.5, pl: 2 }}>
                  <Typography gutterBottom variant="body2">
                    {StringUtils.formatStringToTitleCase(
                      item.usergame.trophyTitleName
                    )}
                  </Typography>
                  <GameTrophiesIcons
                    platinum={item.usergame.earnedTrophies.platinum}
                    gold={item.usergame.earnedTrophies.gold}
                    silver={item.usergame.earnedTrophies.silver}
                    bronze={item.usergame.earnedTrophies.bronze}
                    progress={item.usergame.progress}
                  />
                  <Divider />
                  <Typography
                    display="block"
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ fontSize: 12 }}
                  >
                    {dayjs(item.usergame.lastUpdatedDateTime).format(
                      "ddd, MMM D, YYYY - h:mm A"
                    )}
                  </Typography>
                </Box>
              </Box>
            </NavLink>
          ))
        : skeletonArray.map((index) => (
            <Box key={"skeleton" + index} sx={{ ml: 2 }}>
              <Skeleton variant="rectangular" width={250} height={150} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          ))}
    </Grid2>
  );
};
