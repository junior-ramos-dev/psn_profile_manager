/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";

import { GameList } from "@/components/Game";
import { GamePageHeader } from "@/components/Game/GamePageHeader";
import {
  APP_TITLE,
  FOOTER_HEIGHT,
  PAGE_TITLE_GAMES,
} from "@/settings/app/constants";
import { Box } from "@mui/material";

const Games = () => {
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GAMES} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <GamePageHeader pageTitle={PAGE_TITLE_GAMES} />
      </Box>
      <div
        id="container"
        style={{
          width: "100%",
          height: `calc(100% - ${FOOTER_HEIGHT + 30}px)`,
          position: "relative",
          display: "block",
          // border: "1px solid blue",
          marginTop: "85px",
          // flexShrink: 0,
          whiteSpace: "nowrap",
          // boxSizing: "border-box",
        }}
      >
        <GameList />
      </div>
    </>
  );
};

export default Games;
