/** @jsxImportSource @emotion/react */
import { Image } from "mui-image";

import {
  css,
  IconButton,
  lighten,
  ListItem,
  ListItemIcon,
  useTheme,
} from "@mui/material";

interface IUserProfileimgProps {
  imgUrl: string;
}

export const UserProfileImg = ({ imgUrl }: IUserProfileimgProps) => {
  const theme = useTheme();

  return (
    <ListItem key={imgUrl} sx={{ height: 40, alignItems: "center" }}>
      <ListItemIcon>
        <IconButton
          size="medium"
          css={css`
            box-shadow: ${`0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`};
            transition: "box-shadow 0.1s";
          `}
        >
          <Image src={imgUrl} width={30} height={30} showLoading />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};
