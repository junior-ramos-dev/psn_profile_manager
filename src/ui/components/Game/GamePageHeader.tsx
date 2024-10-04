/** @jsxImportSource @emotion/react */
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { GameSearch } from "./GameSearch";

interface GamePageHeaderProps {
  pageTitle: string;
}

export const GamePageHeader = ({ pageTitle }: GamePageHeaderProps) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      elevation={0}
      color="secondary"
      sx={{ mt: 8.5 }}
    >
      <Toolbar disableGutters variant="dense" sx={{ ml: 10.5 }}>
        <Box sx={{ width: 100 }}>
          <Typography variant="h6" sx={{ mr: 5 }}>
            {pageTitle}
          </Typography>
        </Box>
        <GameSearch />
      </Toolbar>
    </AppBar>
  );
};
