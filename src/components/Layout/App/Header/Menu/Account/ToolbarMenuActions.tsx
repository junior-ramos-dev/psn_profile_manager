import { Box, Stack } from "@mui/material";

import {
  ActionChangeThemeColor,
  ActionMore,
  ActionToggleThemeMode,
  ActionUserAccount,
} from "../Actions/ActionItemsIndex";

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
          <ActionToggleThemeMode disableTitle={true} />
          <ActionChangeThemeColor disableTitle={true} />
          <ActionUserAccount
            onClick={handleProfileMenuOpen}
            disableTitle={true}
          />
        </Box>
      </Stack>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <ActionMore onClick={handleAccountMobileMenuOpen} disableTitle={true} />
      </Box>
    </>
  );
};
