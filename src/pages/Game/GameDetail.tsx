/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { APP_TITLE, PAGE_TITLE_GAMES } from "../../utils/constants";

export const GamesDetail = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            //FIXME
            {PAGE_TITLE_GAMES} | {APP_TITLE}
          </title>
        </Helmet>
      </HelmetProvider>
      //TODO Use redux store
      {/* <Typography variant="h4">{`Hello, ${context.user.name}`}</Typography> */}
      <div
        css={css`
          text-align: center;
          margin-top: 6rem;
        `}
      >
        <div>
          <h2>Games Detail</h2>
        </div>
      </div>
    </>
  );
};
