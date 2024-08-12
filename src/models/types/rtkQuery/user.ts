import { IUser } from "@/models/interfaces";

export type UserProfile = Omit<IUser, "password">;
