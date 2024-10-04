/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";

import { css, Stack, Typography } from "@mui/material";

export const LoginOrRegister = () => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ mr: 1.8, justifyContent: "right", alignItems: "baseline" }}
    >
      <Link
        to="/auth/login"
        css={css`
          text-decoration: underline;
          color: inherit;
        `}
      >
        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
          Login
        </Typography>
      </Link>
      &nbsp;|
      <Link
        to="/auth/register"
        css={css`
          text-decoration: underline;
          color: inherit;
        `}
      >
        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
          Register
        </Typography>
      </Link>
    </Stack>
  );
};
