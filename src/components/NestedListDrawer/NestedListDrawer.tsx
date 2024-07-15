import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

type Anchor = "top" | "left" | "bottom" | "right";

export const NestedListDrawer = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor | any, open: boolean | any) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      const eventTarget = event.target as HTMLElement;

      console.log("toggling, event:", event);
      console.log("----TOGGLINGGGG------", eventTarget.innerText);
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      if (event && eventTarget && eventTarget.innerText === "ADMIN") {
        return;
      }

      console.log("inspect finsih");
      setState({ ...state, [anchor]: open });
    };

  // -------------------------------------------------

  function NestedList(anchor, toggleDrawer) {
    const [open, setOpen] = useState(true);
    console.log("inside nested list:", toggleDrawer);
    const handleClick = () => {
      setOpen(!open);
    };
    const [openDollar, setOpenDollar] = useState(true);
    const handleClickDollar = () => {
      setOpenDollar(!openDollar);
      toggleDrawer();
    };
    return (
      <div>
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText
                primary="COMPUTE"
                onClick={toggleDrawer(anchor, false)}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary="STORAGE"
                onClick={toggleDrawer(anchor, false)}
              />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="ADMIN" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClickDollar}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="DASHBOARDS" />
                  {openDollar ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <div> -- new line start---</div>
                <Collapse in={openDollar} timeout="auto" unmountOnExit>
                  <ListItemButton sx={{ pl: 8 }}>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="ADMIN-SERVICES"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </ListItemButton>
                </Collapse>
                <b></b>
                <div> -- new line end---</div>
              </List>
            </Collapse>
          </List>
        </Box>
      </div>
    );
  }
  //-------------------

  return (
    <div>
      {
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>{"left"}</Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {NestedList("left", toggleDrawer)}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
};
