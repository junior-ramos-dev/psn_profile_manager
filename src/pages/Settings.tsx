/** @jsxImportSource @emotion/react */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

import { PageContentWrapper } from "@/components/Common/PageContentWrapper";
import { RingMessageLoading } from "@/components/Common/RingMessageLoading";
import { SettingsPageHeader } from "@/components/Settings/SettingsPageHeader";
import { APP_TITLE, PAGE_TITLE_SETTINGS } from "@/settings/app/constants";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

interface IScrollDialogProps {
  open: boolean;
  handleClose: () => void;
  descriptionRef: MutableRefObject<HTMLElement>;
  isLoading: boolean;
}

export const ScrollDialog = ({
  open,
  handleClose,
  descriptionRef,
  isLoading,
}: IScrollDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        Loading trophies for all games...
      </DialogTitle>
      {isLoading ? (
        <RingMessageLoading />
      ) : (
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="contained" onClick={handleClose} disabled={isLoading}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SETTINGS} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <SettingsPageHeader pageTitle={PAGE_TITLE_SETTINGS} />
      </Box>
      <PageContentWrapper>
        <Box sx={{ p: 2 }}>
          <Typography>
            Insert or Update the list of trophies for all games
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            onClick={handleClickOpen}
            disabled={isLoading}
          >
            Start
          </Button>
        </Box>
        <Divider />
        <ScrollDialog
          open={open}
          handleClose={handleClose}
          descriptionRef={descriptionElementRef}
          isLoading={isLoading}
        />
      </PageContentWrapper>
    </>
  );
};

export default Settings;
