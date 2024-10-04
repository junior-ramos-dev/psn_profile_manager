/** @jsxImportSource @emotion/react */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

import { PageContentWrapper } from "@/components/Common/PageContentWrapper";
import { RingMessageLoading } from "@/components/Common/RingMessageLoading";
import { SettingsPageHeader } from "@/components/Settings/SettingsPageHeader";
import { useAppDispatch } from "@/hooks/redux";
import { ITrophyListBulk } from "@/models/interfaces/trophy/ITrophy";
import { trophyApi } from "@/services/rtkQueryApi/trophy/trophyApi";
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

interface IDisplayBulkDataProps {
  bulkData: ITrophyListBulk;
}

const DisplayBulkData = ({ bulkData }: IDisplayBulkDataProps) => {
  if (bulkData.data?.gamesTrohiesList) {
    let key = 0;

    return (
      <Box>
        <Typography variant="body2">{bulkData.message}</Typography>
        <Typography variant="body2">
          TOTAL: {bulkData.data.totalGames}
        </Typography>
        <ul>
          {bulkData.data.gamesTrohiesList.map((item) => {
            key++;

            return (
              <li key={key}>
                <Typography variant="body2">{item}</Typography>
              </li>
            );
          })}
        </ul>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography>{bulkData.message}</Typography>
      </Box>
    );
  }
};

interface IScrollDialogProps {
  open: boolean;
  handleClose: () => void;
  descriptionRef: MutableRefObject<HTMLElement>;
  isLoading: boolean;
  bulkData: ITrophyListBulk;
}

export const ScrollDialog = ({
  open,
  handleClose,
  descriptionRef,
  isLoading,
  bulkData,
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
        Loading trophy lists for all games
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
            <DisplayBulkData bulkData={bulkData} />
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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [bulkData, setBulkData] = useState<ITrophyListBulk>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    setIsLoading(true);
    const promise = dispatch(trophyApi.endpoints.getTrophyListBulk.initiate());
    // if (request) request.signal.onabort = promise.abort;

    const res = await promise;
    const { data /* isError, error */ } = res;

    if (data) {
      setIsLoading(false);
      setBulkData(data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
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
          bulkData={bulkData}
        />
      </PageContentWrapper>
    </>
  );
};

export default Settings;
