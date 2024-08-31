/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useLogoutMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionUnsetCredentials } from "@/services/rtkQueryApi/auth/authSlice";
import { DUMMY_ETAG_HEADER, HEADERS } from "@/settings/app/constants";
import { GAME_ENDPOINT_NAME } from "@/settings/app/constants/api";
import { setEnpointHeader } from "@/utils/http";
import { css } from "@emotion/react";
import ExitToApp from "@mui/icons-material/ExitToApp";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const resetEndpointHeaders = () => {
    // Reset/Remove headers in localStorage
    // Game endpoints
    setEnpointHeader(
      GAME_ENDPOINT_NAME.GET_GAME_LIST,
      HEADERS.ETAG,
      DUMMY_ETAG_HEADER
    );
    setEnpointHeader(
      GAME_ENDPOINT_NAME.GET_GAME_LIST,
      HEADERS.IF_NONE_MATCH,
      DUMMY_ETAG_HEADER
    );
  };

  const handleLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(actionUnsetCredentials());
          resetEndpointHeaders();
        });
      navigate("/auth/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ListItemButton
      css={css`
        position: absolute;
        bottom: 0;
        margin-bottom: 20%;
        width: 100%;
      `}
      onClick={handleLogout}
    >
      <ListItemIcon>
        <IconButton size="small">
          <Tooltip title="Logout" placement="right">
            <ExitToApp color="warning" />
          </Tooltip>
        </IconButton>
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  );
};
