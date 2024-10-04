/** @jsxImportSource @emotion/react */
import SearchIcon from "@mui/icons-material/Search";
import { alpha, Box, InputBase, styled } from "@mui/material";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "200px",
  height: "35px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //   padding: theme.spacing(2.6, 3, 3, 0),
  margin: theme.spacing(0.3, 0, 0, 0.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    margin: theme.spacing(0.4, 0, 0, 0.5),
    // padding: theme.spacing(1, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//TODO Implement search function
export const GameSearch = () => (
  <Box sx={{ display: { xs: "none", sm: "flex" } }}>
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchWrapper>
  </Box>
);
