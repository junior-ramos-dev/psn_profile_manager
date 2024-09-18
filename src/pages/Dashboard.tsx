/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const location = useLocation();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">
        {location.pathname.replaceAll("/", " ").toUpperCase()}
      </Typography>
      <Box sx={{ p: 3 }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
