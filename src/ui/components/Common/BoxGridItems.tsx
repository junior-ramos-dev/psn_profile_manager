import { Box, BoxProps } from "@mui/material";

export const PointsItem = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (/*theme*/) => ({
          p: 1,
          m: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "135px",
          border: "1px solid",
          borderColor: "grey.500",
          borderRadius: 2,
          // bgcolor: "#fff",
          // color: "grey.800",
          // fontSize: "0.875rem",
          // fontWeight: "700",
          // ...theme.applyStyles("dark", {
          //   bgcolor: "#101010",
          //   color: "grey.300",
          //   borderColor: "grey.800",
          // }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};

export const ProgressItem = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (/*theme*/) => ({
          p: 1,
          m: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "120px",
          border: "1px solid",
          borderColor: "grey.500",
          borderRadius: 2,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};

export const TrophyItem = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (/*theme*/) => ({
          p: 1,
          m: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
          width: "50px",
          border: "1px solid",
          borderColor: "grey.500",
          borderRadius: 2,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};
