import { IAuthUser } from "@/models/interfaces/auth/IAuthUser";
import { IUserProfile } from "@/models/interfaces/user/IUserProfile";

export type AuthUser = Omit<IAuthUser, "password">;

export type AuthRegisterRequest = Omit<IAuthUser, "id">;

export type AuthLoginRequest = Omit<IAuthUser, "id" | "psnOnlineId">;

export type AuthRegisterResponse = {
  user: AuthUser;
  profile: IUserProfile;
};

export type AuthLoginResponse = {
  user: AuthUser;
  profile: IUserProfile;
};
