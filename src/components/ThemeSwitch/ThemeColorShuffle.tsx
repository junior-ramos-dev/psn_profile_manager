import { useContext } from "react";

import { ActionItem } from "@/components/Layout/App/Header/Menu/Actions/ActionItem";
import { ThemeContext } from "@/contexts/ThemeContext";
import ColorLensIcon from "@mui/icons-material/ColorLens";

export const ThemeColorShuffle = ({
  disableTooltip = false,
}: {
  disableTooltip?: boolean;
}) => {
  const colorMode = useContext(ThemeContext);
  return (
    <ActionItem
      title="Shuffle THeme"
      icon={ColorLensIcon}
      onClick={colorMode.shuffleThemeColor}
      disableTooltip={disableTooltip}
    />
  );
};
