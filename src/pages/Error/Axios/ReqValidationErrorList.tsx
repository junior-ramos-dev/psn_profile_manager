import { ReqValidationError } from "@/services/axios/axiosApiError";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";

interface ReqValidationErrorProps {
  reqErrors: ReqValidationError[];
}

export const ReqValidationErrorList = ({
  reqErrors,
}: ReqValidationErrorProps) => {
  let count = 0;

  return (
    <List>
      {reqErrors.map((error) => {
        count++;
        return (
          <Box key={`box-${count}`} sx={{ alignItems: "baseline" }}>
            <ListItem
              key={`${count}-${error.path}`}
              sx={{ height: 3, alignItems: "baseline" }}
            >
              <Typography variant="subtitle2">Type:</Typography>
              &nbsp;
              <Typography variant="body2">{error.type}</Typography>
            </ListItem>
            <ListItem
              key={`${error.location}-${error.path}`}
              sx={{ height: 2, alignItems: "baseline" }}
            >
              <Typography variant="subtitle2">Message:</Typography>
              &nbsp;
              <Typography variant="body2">{error.msg}</Typography>
            </ListItem>
            <ListItem
              key={`${error.location}-${error.path}`}
              sx={{ height: 2, alignItems: "baseline" }}
            >
              <Typography variant="subtitle2">Path:</Typography>
              &nbsp;
              <Typography variant="body2">{error.path}</Typography>
            </ListItem>
            <ListItem
              key={`${error.location}-${error.path}`}
              sx={{ height: 2, alignItems: "baseline" }}
            >
              <Typography variant="subtitle2">Location:</Typography>
              &nbsp;
              <Typography variant="body2">{error.location}</Typography>
            </ListItem>
            <Divider sx={{ mt: 3 }} />
          </Box>
        );
      })}
    </List>
  );
};
