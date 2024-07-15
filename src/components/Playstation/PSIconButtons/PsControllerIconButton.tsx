import { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

interface PSMenuIconProps {
  toggleNavigation: () => void;
}

export const PsControllerIconButton = ({
  toggleNavigation,
}: PSMenuIconProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={toggleNavigation}>
      <Tooltip title="Show Menu" placement="right">
        <Box mt={2} mb={1} ml={2} mr={2}>
          <SportsEsportsIcon width={40} height={40} />
        </Box>
      </Tooltip>
    </div>
  );
};
