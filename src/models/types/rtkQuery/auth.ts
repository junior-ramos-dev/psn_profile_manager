import { IAuthUser } from "../../interfaces/auth/IAuthUser";

export type AuthUser = Omit<IAuthUser, "password">;

export type AuthRegisterRequest = Omit<IAuthUser, "id">;

export type AuthRegisterResponse = Omit<IAuthUser, "password">;

export type AuthLoginRequest = Omit<IAuthUser, "id" | "psnOnlineId">;

export type AuthLoginResponse = Omit<IAuthUser, "password">;
