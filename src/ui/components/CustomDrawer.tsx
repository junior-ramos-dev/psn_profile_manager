/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";

import { Drawer } from "@mui/material";
import Box from "@mui/material/Box";

interface CustomDrawerProps {
  open: boolean | undefined;
  toggleNavigation: () => void;
  openedWidth: string | number;
  closedWidth: string | number;
  children?: ReactNode;
}

export const CustomDrawer = ({
  open,
  toggleNavigation,
  openedWidth,
  closedWidth,
  children,
}: CustomDrawerProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      id="drawer-container"
      position="relative"
      component="div"
      style={{ overflowY: "scroll", overflowX: "hidden" }}
    >
      <Drawer
        variant="permanent"
        open={open}
        onClose={toggleNavigation}
        elevation={5}
        PaperProps={{
          style: {
            position: "absolute",
            width: open ? (openedWidth as number) : (closedWidth as number),
            transition: "width 400ms",
          },
        }}
        slotProps={{ backdrop: { sx: { position: "absolute" } } }}
        // BackdropProps={{ style: { position: "absolute" } }}
        ModalProps={{
          container: document.getElementById("drawer-container"),
          style: { position: "absolute" },
        }}
        SlideProps={{
          onExiting: (node) => {
            node.style.transform = "scaleX(0)";
            node.style.transformOrigin = "top left ";
          },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
};
