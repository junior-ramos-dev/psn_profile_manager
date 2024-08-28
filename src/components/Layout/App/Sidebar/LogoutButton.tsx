/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useLogoutMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionUnsetCredentials } from "@/services/rtkQueryApi/auth/authSlice";
import { GAME_ENDPOINT_NAME } from "@/services/rtkQueryApi/game";
import { HEADERS } from "@/settings/app/constants";
import { clearEnpointHeader } from "@/utils/http";
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

  const [logout /*{ isLoading, isError, isSuccess, data }*/] =
    useLogoutMutation();

  const clearAllEndpointHeaders = () => {
    // Remove headers in localStorage
    // Game endpoints
    clearEnpointHeader(GAME_ENDPOINT_NAME.GET_GAME_LIST, HEADERS.ETAG);
    clearEnpointHeader(GAME_ENDPOINT_NAME.GET_GAME_LIST, HEADERS.IF_NONE_MATCH);
  };

  const handleLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(actionUnsetCredentials());
          clearAllEndpointHeaders();
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
