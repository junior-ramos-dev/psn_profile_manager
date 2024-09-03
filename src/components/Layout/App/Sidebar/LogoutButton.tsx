/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useLogoutMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionUnsetCredentials } from "@/services/rtkQueryApi/auth/authSlice";
import { actionUnsetUserProfile } from "@/services/rtkQueryApi/user/userSlice";
import { resetGameEndpointHeaders } from "@/settings/app/constants/api/game";
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
    resetGameEndpointHeaders();
  };

  const handleLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(actionUnsetCredentials());
          dispatch(actionUnsetUserProfile());
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
