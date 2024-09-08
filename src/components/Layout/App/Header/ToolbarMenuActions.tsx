import { Box, Stack } from "@mui/material";

import { ActionAccountUser } from "../Actions/AccountActionItems";
import {
  ActionAppChangeThemeColor,
  ActionAppMore,
  ActionAppToggleThemeMode,
} from "../Actions/AppActionItems";

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
          <ActionAppToggleThemeMode disableTitle={true} />
          <ActionAppChangeThemeColor disableTitle={true} />
          <ActionAccountUser
            onClick={handleProfileMenuOpen}
            disableTitle={true}
          />
        </Box>
      </Stack>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <ActionAppMore
          onClick={handleAccountMobileMenuOpen}
          disableTitle={true}
        />
      </Box>
    </>
  );
};
