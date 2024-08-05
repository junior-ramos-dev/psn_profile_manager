import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Box, Tooltip } from "@mui/material";

interface PSMenuIconProps {
  toggleNavigation: () => void;
}

export const PsControllerIconButton = ({
  toggleNavigation,
}: PSMenuIconProps) => {
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
