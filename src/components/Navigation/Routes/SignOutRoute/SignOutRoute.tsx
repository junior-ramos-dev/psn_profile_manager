/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ExitToApp from "@mui/icons-material/ExitToApp";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useLogoutMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionUnsetCredentials } from "@/services/rtkQueryApi/auth/authSlice";

export const SignOutRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading, isError, isSuccess, data }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(actionUnsetCredentials());
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
