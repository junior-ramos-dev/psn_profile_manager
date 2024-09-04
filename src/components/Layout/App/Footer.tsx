/** @jsxImportSource @emotion/react */
import { FOOTER_HEIGHT, FOOTER_TEXT } from "@/settings/app/constants";
import { css } from "@emotion/react";
import { styled, Typography } from "@mui/material";

const FooterWrapper = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  minHeight: FOOTER_HEIGHT - 18,
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  zIndex: theme.zIndex.drawer + 2,
}));

export const Footer = () => {
  return (
    <FooterWrapper>
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
    </FooterWrapper>
  );
};
