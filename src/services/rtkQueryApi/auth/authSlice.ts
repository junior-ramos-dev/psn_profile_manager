import { UserBasicInfo } from "@/models/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface IAuthInitialState {
  user: UserBasicInfo;
  token: string;
  isLoggedIn: boolean;
}

const initialState: IAuthInitialState = {
  user: {
    id: null,
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actionSetCredentials: (state, { payload }) => {
      state.user = payload;
      // state.token = token;
      state.isLoggedIn = true;
    },
    actionUnsetCredentials: (state) => {
      state.user = { id: null, name: null, email: null };
      state.token = null;
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
