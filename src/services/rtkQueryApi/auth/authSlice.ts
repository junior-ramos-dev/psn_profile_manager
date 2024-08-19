import { AuthUser } from "@/models/types/rtkQuery/auth";
import { createSlice } from "@reduxjs/toolkit";

interface IAuthInitialState {
  user: AuthUser;
  isLoggedIn: boolean;
}

const initialState: IAuthInitialState = {
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionSetCredentials: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
    actionUnsetCredentials: (state) => {
      state.user = { id: null, psnUsername: null, email: null };
      state.isLoggedIn = false;
    },
    actionRefreshCredentials: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
  },
});

export const {
  actionSetCredentials,
  actionUnsetCredentials,
  actionRefreshCredentials,
} = authSlice.actions;

export default authSlice.reducer;
