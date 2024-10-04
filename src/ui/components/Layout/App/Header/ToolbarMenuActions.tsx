/** @jsxImportSource @emotion/react */
import { Box, Stack } from "@mui/material";

import { ActionAccountUser } from "../Actions/AccountActionItems";
import { ActionAppMore } from "../Actions/AppActionItems";

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
      <Stack direction="row" spacing={0.7} sx={{ mr: 2 }}>
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
