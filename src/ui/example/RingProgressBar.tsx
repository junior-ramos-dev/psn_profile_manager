import React, { useContext } from "react";
import { TaskLoaderProgressContext } from "jrd_task_loader_progress";
import { RingLoader } from "react-spinners";

import { TASK_MSG_MAP } from "@/services/taskLoaders/auth/authTaskLoaders";
import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export const RingProgressBar = () => {
  const theme = useTheme();
  const { progress, buffer, taskId } = useContext(TaskLoaderProgressContext);

  const message = TASK_MSG_MAP[taskId];

  console.log(taskId, TASK_MSG_MAP[taskId]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack alignItems="center" spacing={2} sx={{ width: "30%" }}>
        <RingLoader color={theme.palette.primary.main} />
        <Typography variant="subtitle2">{`${message}: ${progress}%`}</Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </Box>
      </Stack>
    </Box>
  );
};
