/** @jsxImportSource @emotion/react */
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

interface PageHeaderProps {
  pageTitle: string;
}

export const PageHeader = ({ pageTitle }: PageHeaderProps) => {
  return (
    <AppBar
      component="div"
      position="fixed"
      elevation={0}
      color="secondary"
      sx={{ mt: 8.5 }}
    >
      <Toolbar disableGutters variant="dense" sx={{ ml: 10.5 }}>
        <Box sx={{ width: "80%" }}>
          <Typography variant="h6" sx={{ mr: 5 }}>
            {pageTitle}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
