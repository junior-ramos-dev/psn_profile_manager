import { IUserProfile } from "@/models/interfaces/user/IUserProfile";
import { createSlice } from "@reduxjs/toolkit";

interface UserProfileInitialState {
  userProfile: IUserProfile;
}

const initialState: UserProfileInitialState = {
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionSetUseProfile: (state, { payload }) => {
      state.userProfile = payload;
    },
    actionUnsetUserProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { actionSetUseProfile, actionUnsetUserProfile } =
  userSlice.actions;

export default userSlice.reducer;
