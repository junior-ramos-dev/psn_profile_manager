import { Box, Stack } from "@mui/material";

import {
  More,
  ThemeColorShuffle,
  ThemeModeSwitch,
  UserAccount,
} from "./Actions";

interface ToolbarMenuActionsProps {
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleAccountMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ToolbarMenuActions = ({
  handleProfileMenuOpen,
  handleAccountMobileMenuOpen,
}: ToolbarMenuActionsProps) => {
  return (
    <>
      <Stack spacing={0.1}>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              alignItems: "center",
              justifyContent: "right",
            },
          }}
        >
          <ThemeModeSwitch disableTitle={true} />
          <ThemeColorShuffle disableTitle={true} />
          <UserAccount onClick={handleProfileMenuOpen} disableTitle={true} />
        </Box>
      </Stack>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <More onClick={handleAccountMobileMenuOpen} disableTitle={true} />
      </Box>
    </>
  );
};
