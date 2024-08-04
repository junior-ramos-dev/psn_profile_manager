import { Box, Tooltip } from "@mui/material";

import { PsLogoColorSvg } from "../PsLogoColorSvg";

interface PSMenuIconProps {
  toggleNavigation: () => void;
}

export const PsMenuIconButton = ({ toggleNavigation }: PSMenuIconProps) => {
  return (
    <div onClick={toggleNavigation}>
      <Tooltip title="Show Menu" placement="right">
        <Box mt={2} mb={1} ml={2} mr={2}>
          <PsLogoColorSvg width={40} height={40} />
        </Box>
      </Tooltip>
    </div>
  );
};
