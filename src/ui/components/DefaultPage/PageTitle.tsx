/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

export const PageTitle = ({ title }: { title: string }) => (
  <Typography
    css={css`
      text-transform: uppercase;
    `}
    variant="h4"
    component="h5"
    color="textSecondary"
  >
    {title}
  </Typography>
);
