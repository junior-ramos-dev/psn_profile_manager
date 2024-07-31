/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { css } from "@emotion/react";

export const PageTitle = ({ title }: { title: string }) => (
  <Typography
    css={css`
      text-transform: uppercase;
    `}
    variant="h3"
    component="h4"
    color="textSecondary"
  >
    {title}
  </Typography>
);
