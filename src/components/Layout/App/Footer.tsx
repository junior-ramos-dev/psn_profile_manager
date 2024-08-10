/** @jsxImportSource @emotion/react */
import { FOOTER_HEIGHT, FOOTER_TEXT } from "@/settings/app/constants";
import { css } from "@emotion/react";
import { Typography, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        justify-content: center;
        background: ${theme.palette.background.paper};
        min-height: ${FOOTER_HEIGHT};
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: ${theme.zIndex.drawer + 2};
      `}
    >
      <Typography
        css={css`
          word-spacing: 0.1rem;
          text-transform: uppercase;
        `}
        variant="caption"
        color="textSecondary"
      >
        {FOOTER_TEXT}
      </Typography>
    </div>
  );
};
