import { FOOTER_HEIGHT } from "@/settings/app/constants";
import { styled } from "@mui/material";

export const PageContentWrapper = styled("div")(() => ({
  width: "100%",
  height: `calc(100% - ${FOOTER_HEIGHT + 30}px)`,
  position: "relative",
  display: "block",
  // border: "1px solid blue",
  marginTop: "100px",
  // flexShrink: 0,
  whiteSpace: "nowrap",
  // boxSizing: "border-box",
}));
