/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";

import { PageTitle } from "@/ui/components/DefaultPage";
import { Box, Typography } from "@mui/material";

const Index = () => {
  const location = useLocation();

  return (
    <Box sx={{ mt: 4 }}>
      {/* <PageTitle title={location.pathname.replaceAll("/", " ").trimStart()} /> */}
      <PageTitle title="Welcome to PSN App!" />
      <Typography variant="h3">
        {location.pathname.replaceAll("/", " ").toUpperCase().trimStart()}
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

export default Index;
