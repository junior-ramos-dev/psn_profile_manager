/** @jsxImportSource @emotion/react */

//TODO Refactor change to match page layout
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const Loading = () => {
  return (
    <Box sx={{ width: 800 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};
