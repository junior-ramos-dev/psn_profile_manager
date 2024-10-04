/** @jsxImportSource @emotion/react */
import { NavLink } from "react-router-dom";

import { APP_TITLE } from "@/settings/app/constants";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

export const Title = () => (
  <NavLink
    to="/home"
    css={css`
      text-decoration: none;
      color: inherit;
    `}
  >
    <Typography
      variant="h6"
      noWrap
      css={css`
        display: {
          xs: none;
          sm: block;
        }
        cursor: pointer;
      `}
    >
      {APP_TITLE}
    </Typography>
  </NavLink>
);
