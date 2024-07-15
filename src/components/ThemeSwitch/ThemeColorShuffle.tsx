import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import { ActionItem } from "../Actions/ActionItem";

export const ThemeColorShuffle = ({
  disableTooltip = false,
}: {
  disableTooltip?: boolean;
}) => {
  const colorMode = React.useContext(ThemeContext);
  return (
    <ActionItem
      title="Shuffle THeme"
      icon={ColorLensIcon}
      onClick={colorMode.shuffleThemeColor}
      disableTooltip={disableTooltip}
    />
  );
};
