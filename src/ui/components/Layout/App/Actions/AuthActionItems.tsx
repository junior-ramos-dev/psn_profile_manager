/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/redux";
import { useLogoutMutation } from "@/services/rtkQueryApi/auth/authApi";
import { actionUnsetCredentials } from "@/services/rtkQueryApi/auth/authSlice";
import { actionUnsetUserProfile } from "@/services/rtkQueryApi/user/userProfileSlice";
import { AppThemeColor } from "@/settings/app/theme/appTheme";
import { Login as LoginIcon, Logout as LogoutIcon } from "@mui/icons-material";

import { ActionItemIcon } from "./ItemType/ActionItemIcon";

interface IAuthActionItemsProps {
  handleMenuClose?: () => void;
  iconColor?: AppThemeColor;
  disableTitle?: boolean;
  disableTooltip?: boolean;
}

export const ActionLogin = ({
  handleMenuClose,
  iconColor,
  disableTooltip = false,
  disableTitle = false,
}: IAuthActionItemsProps) => {
  const navigate = useNavigate();

  const handleActionLogin = async () => {
    try {
      navigate("/auth/login");
      if (handleMenuClose) handleMenuClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ActionItemIcon
      title="Login"
      icon={LoginIcon}
      iconColor={iconColor}
      onClick={handleActionLogin}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};

export const ActionLogout = ({
  handleMenuClose,
  iconColor,
  disableTooltip = false,
  disableTitle = false,
}: IAuthActionItemsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleActionLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(actionUnsetCredentials());
          dispatch(actionUnsetUserProfile());
        });
      navigate("/auth/login");
      if (handleMenuClose) handleMenuClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ActionItemIcon
      title="Logout"
      icon={LogoutIcon}
      iconColor={iconColor}
      onClick={handleActionLogout}
      disableTooltip={disableTooltip}
      disableTitle={disableTitle}
    />
  );
};
